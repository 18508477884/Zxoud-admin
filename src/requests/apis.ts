// 导入axios实例
import httpRequest from './index';

// 定义接口的传参
interface UserInfoParam {
  userID: string;
  userName: string;
}

// 获取用户信息
export function apiGetUserInfo(param: UserInfoParam) {
  return httpRequest({
    url: '/user/login',
    method: 'post',
    data: param,
  });
}

export function apiGetFileInfo() {
  return httpRequest({
    url: '/file/Info',
    method: 'post',
  });
}
