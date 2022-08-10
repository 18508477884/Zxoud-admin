<template>
  <div>登录页面</div>
</template>
<script setup lang="ts">
import { apiGetUserInfo } from '@/requests/apis';
import '../../../mock/api';
let directory = ref(['文件夹1', '文件夹2', '文件夹3']);
let replace = function () {
  console.log(111);
};
function getUserInfo() {
  const param = {
    userID: '10001',
    userName: 'Mike',
  };
  apiGetUserInfo(param).then((res) => {
    console.log(res);
  });
}
onMounted(() => {
  getUserInfo();
});
</script>
