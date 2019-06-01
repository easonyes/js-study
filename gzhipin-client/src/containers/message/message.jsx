/*
* 消息界面路由容器组件
* */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Badge} from "antd-mobile";

const Item = List.Item;
const Brief = Item.Brief;

/*//
对 chatMsgs 进行分组，通过 chat_id, 并得到每个组的 lastMsg 组成的数组
1. 找出每个聊天的 lastMsg，并用一个对象容器保存 {chat_id: lastMsg,}
2. 得到所有 lastMsg 的数组
3. 对数组进行排序（按 create_time 降序排序）
*/
function getLastMsgs(chatMsgs, userid) {
  // 1. 找出每个聊天的 lastMsg，并用一个对象容器保存 {chat_id: lastMsg,}
  let lastMsgObjs = {};
  chatMsgs.forEach(msg => {
    // 对 msg 进行个体的统计
    if (msg.to===userid && !msg.read) {
      msg.unReadCount = 1;
    }else {
      msg.unReadCount = 0;
    }
    // 得到 msg 的聊天标识 id
    const chatId = msg.chat_id;
    // 获取已保存的当前组件的lastMsg
    const lastMsg = lastMsgObjs[chatId];
    // 没有
    if (!lastMsg) { // 当前 msg 就是所在组的 LastMsg
      lastMsgObjs[chatId] = msg;
    } else { // 有 如果 msg 比 lastMsg 晚，就保存 msg
      // 保存已经统计的未读数量
      const unReadCount = lastMsg.unReadCount;
      if (msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatId] = msg;
      }
      // 累加 unReadCount 并保存在最新的 lastMsg 上
      lastMsgObjs[chatId].unReadCount = unReadCount + msg.unReadCount;
    }
  });
  // 2. 得到所有 lastMsg 的数组
  const lastMsgs = Object.values(lastMsgObjs);
  // 3. 对数组进行排序（按 create_time 降序排序）
  lastMsgs.sort(function (msg1, msg2) { // 如果结果 < 0，将 msg1 放在前面，如果为0，不变
    return msg2.create_time-msg1.create_time;
  });

  return lastMsgs;
}

class Message extends Component{

  render() {
    const {user} = this.props;
    const {users, chatMsgs} = this.props.chat;

    // 对 chatMsgs 进行分组，通过 chat_id
    const lastMsgs = getLastMsgs(chatMsgs, user._id);



    return (
      <List style={{marginTop: 45, marginBottom: 50}}>

        {lastMsgs.map(msg => {
          // 找到目标用户的 id
          const userid = user._id===msg.from ? msg.to : msg.from;
          return (
            <Item
              key={msg._id}
              extra={<Badge text={msg.unReadCount}/>}
              thumb={users[userid].header ? require(`../../assets/img/${users[userid].header}.png`) : null}
              arrow='horizontal'
              onClick={() => this.props.history.push(`/chat/${userid}`)}
            >
              {msg.content}
              <Brief>{users[userid].username}</Brief>
            </Item>
            )
        })}
      </List>
    );
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message);