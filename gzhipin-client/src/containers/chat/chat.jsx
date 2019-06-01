/*
* 消息列表容器组件
* */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Icon, InputItem, List, NavBar} from "antd-mobile";
import QueueAnim from 'rc-queue-anim';

import {sendMsg, readMsg} from '../../redux/actions';


const Item = List.Item;

class Chat extends Component{

  state = {
    content: '',
    isShow: false, // 是否显示表情列表
  };

  // 在第一次 render() 之前回调
  componentWillMount() {
    // 初始化表情数据
    const emojis = ['😀', '😃', '😄', '😁', '😆','😅','🤣','😂','🙂', '🙃','😉',
      '😊','😇','😍','🤩','😘','😗','☺','😚','😙','😋','😛','😜',
      '😊','😇','😍','🤩','😘','😗','☺','😚','😙','😋','😛','😜',
      '😊','😇','😍','🤩','😘','😗','☺','😚','😙','😋','😛','😜',
      '😊','😇','😍','🤩','😘','😗','☺','😚','😙','😋','😛','😜',
      '😊','😇','😍','🤩','😘','😗','☺','😚','😙','😋','😛','😜',
      '😊','😇','😍','🤩','😘','😗','☺','😚','😙','😋','😛','😜'
    ];
    this.emojis = emojis.map(item => ({text: item}));
  }

  componentDidMount() {
    // 初始化显示消息列表
    window.scrollTo(0, document.body.scrollHeight);

    const from = this.props.match.params.userid;
    const to = this.props.user._id;
    // 发请求更新消息的未读数量
    this.props.readMsg(from, to);
  }

  componentWillUnmount() {
    const from = this.props.match.params.userid;
    const to = this.props.user._id;
    // 发请求更新消息的未读数量
    this.props.readMsg(from, to);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 更新显示消息列表
    window.scrollTo(0, document.body.scrollHeight);
  }

  toggleShow = () => {
    const isShow = !this.state.isShow;
    this.setState({isShow});
    if (isShow) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0);
    }
  };

  handleSend = () => {
    // 收集数据
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content.trim();
    // 发送请求
    if (content) {
      this.props.sendMsg({from, to, content});
    }
    // 清除输入数据
    this.setState({content: '', isShow: false});
  };

  render() {
    const {user} = this.props;
    const {users, chatMsgs} = this.props.chat;

    // 计算当前用户和目标用户的 chat_id
    const from = user._id;
    if (!users[from]) { // 如果还没有获取数据，不做任何显示
      return null;
    }
    const to = this.props.match.params.userid;
    const chat_id = [from, to].sort().join('_');

    // 对 chatMsgs 进行过滤
    const msgs = chatMsgs.filter(msg => msg.chat_id === chat_id);

    // 取出目标用户的头像
    const targetUser = users[to];
    const targetHeader = targetUser.header;
    const targetIcon = targetHeader ? require(`../../assets/img/${targetHeader}.png`) : null;

    return(
      <div id='chat-page'>
        <NavBar
          icon={<Icon type='left'/>}
          onLeftClick={() => this.props.history.goBack()}
        >
          {targetUser.username}
        </NavBar>
        <List style={{marginBottom: 45, marginTop: 45}}>
            {
              msgs.map(msg => {
                if (from===msg.to) { // 对方发给我的
                  return (<Item
                    key={msg._id}
                    thumb={targetIcon}
                  >
                    {msg.content}
                  </Item>)
                } else { // 我发给对方的
                  return (<Item
                    key={msg._id}
                    className='chat-me'
                    extra='我'
                  >
                    {msg.content}
                  </Item>)
                }
              })
            }
        </List>
        <div className='nav-footer'>
          <InputItem
            placeholder='请输入'
            value={this.state.content}
            onChange={val => this.setState({content: val})}
            onFocus={() => this.setState({isShow: false})}
            extra={
              <span>
                <span
                  onClick={this.toggleShow}
                  style={{marginRight: 5}}>😉</span>
                <span onClick={this.handleSend}>发送</span>
              </span>
            }
          />
          {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item) => {
                this.setState({content: this.state.content + item.text})
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat);