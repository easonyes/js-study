/*
* 包含 n 个 action creator
* 异步 action
* 同步 action
* */
import {
  AUTH_SUCCESS,
  ERROR_MSG
} from './action-types'
import {
  reqRegister,
  reqLogin
} from '../api';

// 每一个 action-type 都对应一个同步 action
// 授权成功的同步 action
const authSuccess = (user) => ({
  type: AUTH_SUCCESS,
  data: user
});
// 错误提示信息的同步 action
const errorMsg = (msg) => ({
  type: ERROR_MSG,
  data: msg
});


// 注册的异步 action
export const register = (user) => {
  const {username, password, password2, type} = user;
  // 做表单的前台检查，如果不通过，返回一个 errorMsg 的同步 action
  if (!username){
    return errorMsg('用户名不能为空');
  }
  if (password !== password2 || !password) {
    return errorMsg('密码不能为空且必须一致');
  }

  return async dispatch => {
    // 发送注册的异步 ajax 请求
    /*
    const promise = reqRegister(user);
    promise.then(response => {
      const result = response.data // {code: 0/1, data: user, msg: ''}
     })
     */
    const response = await reqRegister({username, password, type});
    const result = response.data;
    if (result.code === 0){//成功
      // 分发授权成功的 action
      dispatch(authSuccess(result.data));
    } else {//失败
      // 分发错误提示的 action
      dispatch(errorMsg(result.msg));
    }
  }
};

// 登录的异步 action
export const login = (user) => {
  const {username, password, password2, type} = user;
  // 做表单的前台检查，如果不通过，返回一个 errorMsg 的同步 action
  if (!username){
    return errorMsg('用户名不能为空');
  }
  if (!password) {
    return errorMsg('密码不能为空');
  }

  // 表单数据合法，返回一个 ajax 请求的异步 action 函数
  return async dispatch => {
    // 发送注册的异步 ajax 请求
    const response = await reqLogin({username, password, type});
    const result = response.data;
    if (result.code === 0){
      //成功
      // 分发授权成功的 action
      dispatch(authSuccess(result.data));
    } else {//失败
      // 分发错误提示的 action
      dispatch(errorMsg(result.msg));
    }
  }
};