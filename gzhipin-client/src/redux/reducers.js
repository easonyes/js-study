/*
* 包含 n 个 reducer 函数：根据老的 state 和指定的 action 返回
* 一个新的 state
* */
import {combineReducers} from 'redux';
import {getRedirectTo} from '../utils'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST,
  MSG_READ,
} from './action-types';

const initUser = {
  username: '', // 用户名
  type: '', // 用户类型 dashen / laoban
  msg: '', // 错误提示信息
  redirectTo: '' // 需要自动重定向的路由路径
};
const initUserList = [];
// 产生 user 状态的 reducer
function user(state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS: // data 是 user
      // return action.data
      const {type, header} = action.data;
      return {...action.data, redirectTo: getRedirectTo(type, header)};
    case ERROR_MSG: // data 是 msg
      return {...state, msg: action.data};
    case RECEIVE_USER: // data 是 user
      return action.data;
    case RESET_USER: // data 是 msg
      return {...initUser, msg: action.data};
    default:
      return state;
  }
}

// 产生 userList 状态的 reducer
function userList(state=initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST: // data 为 userList
      return action.data;
    default:
      return state;
  }
}

const initChat = {
  users: {}, // 所有用户信息的对象 {username, header}
  chatMsgs: [], // 当前用户所有相关 msg 的数组
  unReadCount: 0, // 总的未读数量
};

// 产生 chat 状态的 reducer
function chat(state=initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST: // data {users, chatMsgs}
      const {users, chatMsgs, userid} = action.data;
      return {
        users: users,
        chatMsgs: chatMsgs,
        unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal+(!msg.read&&msg.to===userid ? 1 : 0),0)
      };
    case RECEIVE_MSG: // data: chaMsg
      const {chatMsg} = action.data;
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
      };
    case MSG_READ:
      const {from, to, count} = action.data;
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(msg => {
          if (msg.from===from && msg.to===to && !msg.read) { // 需要更新
            return {...msg, read: true};
          } else { // 不需要更新
            return msg;
          }
        }),
        unReadCount: state.unReadCount - count,
      };
    default:
      return state;
  }
}

export default combineReducers({
  user,
  userList,
  chat,
})
// 向外暴露的状态的结构：{ user: {}, userList: [], chat: {}}

