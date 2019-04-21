/*
* 包含 n 个 reducer 函数：根据老的 state 和指定的 action 返回
* 一个新的 state
* */
import {combineReducers} from 'redux';

import {
  AUTH_SUCCESS,
  ERROR_MSG
} from './action-types';

const initUser = {
  username: '', // 用户名
  type: '', // 用户类型 dashen / laoban
  msg: '', // 错误提示信息
  redirectTo: '' // 需要自动重定向的路由路径
};
// 产生 user 状态的 reducer
function user(state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS: // data 是 user
      // return action.data
      return {...action.data, redirectTo: '/'};
    case ERROR_MSG: // data 是 msg
      return {...state, msg: action.data};
    default:
      return state;
  }
}

export default combineReducers({
  user,
})
// 向外暴露的状态的结构：{ user: {},  }