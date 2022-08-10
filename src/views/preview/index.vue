<template>
  <div class="m-10px mt0 bg-#fff">
    <div class="flex items-center place-content-between mb20px">
      <div class="flex-1 flex border-1 border-gray-400">
        <div
          class="cursor-pointer hover:bg-blue-200 p10px"
          v-for="(item, index) in directory"
          :key="index"
          @click="replace(index)"
        >
          {{ item }}
          {{ index != directory.length - 1 ? '>' : '' }}
        </div>
      </div>
      <div class="w200px" @click="updateFolder">刷新</div>
    </div>
    <div class="flex">
      <div>
        <div class="flex">
          <div class="w65">名称</div>
          <div class="w40">修改日期</div>
          <div class="w30">类型</div>
          <div class="w20">大小</div>
        </div>
        <div
          class="flex hover:bg-blue-300 py-1 cursor-pointer my-2 select-none"
          :class="[
            item.type == '文件夹' ? 'bg-yellow-300' : 'bg-gray-400',
            selectedState.indexOf(item.name) >= 0 ? 'selectedState' : '',
          ]"
          v-for="(item, index) in currentFile"
          :key="item.id"
          @click="preview(item.type, item.name, index)"
          @dblclick="enter(item.name, item.type)"
        >
          <div class="w65">{{ item.name }}</div>
          <div class="w40">{{ item.time }}</div>
          <div class="w30">{{ item.type }}</div>
          <div class="w20">{{ item.size }}M</div>
        </div>
      </div>
      <div class="preview flex-1">预览</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiGetFileInfo } from '@/requests/apis';
import '../../../mock/api';

type Folder = {
  id: number;
  name: string;
  time: number;
  type: string;
  size: number;
  children?: Folder[];
};
let directory = ref<string[]>(['根目录']);
const state = reactive<{ currentFile: Folder[]; AllFolderList: Folder[] }>({
  currentFile: [],
  AllFolderList: [],
});
const isPreview = ref('#FFF');

const isshift = ref(false); // 快捷键 shift 是否被按下
const isctrl = ref(false); // 快捷键 ctrl 是否被按下
const selectedState = ref<string[]>([]); // 上方div图切是否被多选中，

const shiftNum = ref(0); //

function updateFolder() {
  getFolderData();
  //replace();
}
const replace = function (index: number = directory.value.length) {
  console.log(index, directory.value.length);
  directory.value.splice(index + 1);
  if (index == 0) {
    console.log(state);
    state.currentFile = state.AllFolderList;
  } else {
    let findDirectory: Folder[] = state.AllFolderList;
    for (let index = 1; index < directory.value.length; index++) {
      findDirectory = <Folder[]>(
        findDirectory.find(
          (item: { name: string }) => item.name == directory.value[index],
        )?.children
      );

      state.currentFile = findDirectory;
    }
    console.log('返回', directory.value, state.AllFolderList);
  }
};

async function getFolderData() {
  let data = await apiGetFileInfo();
  state.currentFile = state.AllFolderList = data.data;
  //
  selectedState.value = [];
}

let enter = (name: string, type: string) => {
  if (type == '文件夹') {
    directory.value.push(name);
    state.currentFile = <Folder[]>(
      state.currentFile.find((item: { name: string }) => item.name == name)
        ?.children
    );
    isPreview.value = '#FFF';
  } else {
    isPreview.value = '#999';
  }
};
let preview = (type: string, name: string, index: number) => {
  // console.log(shiftNum.value, name, index);
  if (type != '文件夹') {
    isPreview.value = '#999';
  } else {
    isPreview.value = '#FFF';
  }
  if (isctrl.value) {
    // 如果按下的是ctrl
    let i = selectedState.value.indexOf(name); // 判断选中列表中是否包含这个点击的div
    if (i < 0) {
      selectedState.value.push(name); // 如果不包含就加进去
    } else {
      selectedState.value.splice(i, 1); // 如果包含就删，表示按下ctrl键点一下选中，在点一下取消选中
    }
  } else if (isshift.value) {
    // 如果按下的是shift
    if (selectedState.value.length == 0) {
      // shift第一次点击
      shiftNum.value = index; // 让当前点击的下标赋值给shiftNum
      selectedState.value.push(name);
    } else {
      console.log(shiftNum.value, index);
      selectedState.value = [];
      let i, j;
      shiftNum.value > index
        ? ((i = index), (j = shiftNum.value))
        : ((i = shiftNum.value), (j = index));
      for (i; i <= j; i++) {
        // 把中间的都选中
        selectedState.value.push(state.currentFile[i].name);
      }
      shiftNum.value = index; // 让当前点击的下标赋值给shiftNum
    }
    console.log(selectedState.value);
  }
};
function compare() {
  //排序 文件夹排在前面
  return function (object1: Folder, object2: Folder) {
    let value1 = object1.type;
    let value2 = object2.type;
    if (value2 == '文件夹' && value1 != '文件夹') {
      return 0;
    } else if (
      (value2 != '文件夹' && value1 != '文件夹') ||
      (value2 == '文件夹' && value1 == '文件夹')
    ) {
      return 1;
    } else {
      return -1;
    }
  };
}
let currentFile = computed(() => {
  return state.currentFile.sort(compare());
});
console.log(currentFile);

//

const keyDown = () => {
  // 键盘按下事件
  document.onkeydown = (e) => {
    // 取消默认事件
    e.preventDefault();
    //事件对象兼容
    let e1 = e || event || window.event;
    //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40  回车：13   ctrl：17   shift：16
    switch (e1.keyCode) {
      case 16:
        isshift.value = true; // 如果shift按下就让他按下的标识符变为true
        break;
      case 17:
        isctrl.value = true; // 如果ctrl按下就让他按下的标识符变为true
        break;
    }
  };
  // 键盘抬起事件
  document.onkeyup = (e) => {
    // 取消默认事件
    e.preventDefault();
    //事件对象兼容
    let e1 = e || event || window.event;
    switch (e.keyCode) {
      case 16:
        shiftNum.value = 0;
        isshift.value = false; // 如果shift抬起下就让他按下的标识符变为false
        break;
      case 17:
        isctrl.value = false; // 如果ctrl抬起下就让他按下的标识符变为false
        break;
    }
  };
};
onMounted(() => {
  getFolderData();
  keyDown();
});
</script>

<style scoped>
.preview {
  background-color: v-bind(isPreview);
}
.selectedState {
  background-color: rgba(147, 197, 253) !important;
}
</style>
