/*
* 主路由组件
* */
import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie'; // 可以操作前端的 cookie 对象， set(), remove()，get()
import {NavBar} from 'antd-mobile';

import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';
import Laoban from '../laoban/laoban';
import Dashen from '../dashen/dashen';
import Message from '../message/message';
import Personal from '../personal/personal';
import NotFound from '../../components/not-found/not-found';
import NavFooter from '../../components/nav-footer/nav-footer';
import Chat from '../chat/chat';

import {getRedirectTo} from '../../utils';
import {getUser} from '../../redux/actions'

 class Main extends Component{

  // 给组件对象添加属性
  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/laoban',
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen',
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal',
      component: Personal,
      title: '个人界面',
      icon: 'personal',
      text: '个人',
    },
  ];

   componentDidMount() {
     // 登录过（cookie中有userid），但没有登录（redux管理的user中没有_id） 发请求获取对应的user
     const userid = Cookies.get('userid');
     const {_id} = this.props.user;
     if (userid && !_id) {
       // 发送异步请求，获取user
       // console.log('发送ajax请求获取user');
       this.props.getUser();

     }
   }

   render() {
    /*// 检查用户是否登录，如果没有，自动重定向到登录界面
    const {user} = this.props;
    if (!user._id) {
      return <Redirect to='/login'/>
    }*/
    // 读取 cookie 中的 userid
    const userid = Cookies.get('userid');
    // 如果没有，自动重定向到登录界面
    if (!userid){
      return <Redirect to='/login'/>
    }
    // 如果有，1.读取 redux 中的 user 状态值，
    const {user, unReadCount} = this.props;
    // 如果user 没有 _id ，返回 null --不做任何显示
    if (!user._id) {
      return null;
    }else {   // 如果有 _id ，显示对应的界面
      // 如果请求根路径，根据 user 的 type 和 header 来计算出一个重定向的路由，并自动重定向
      let path = this.props.location.pathname;
      if (path === '/') {
        path = getRedirectTo(user.type, user.header);
        return <Redirect to={path}/>
      }
    }

    const {navList} = this;
     const path = this.props.location.pathname;
     const currentNav = navList.find(nav => nav.path === path); // 得到当前的 nav, 可能没有
     if (currentNav) {
       // 决定哪个路由需要隐藏
       if (user.type === 'laoban') {
         // 隐藏数组的第2个
         navList[1].hide = true;
       } else {
         //隐藏数组的第1个
         navList[0].hide = true;
       }
     }

    return (
      <div>
        {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component} />)
          }
          <Route path='/laobaninfo' component={LaobanInfo} />
          <Route path='/dasheninfo' component={DashenInfo}/>
          <Route path='/chat/:userid' component={Chat}/>
          {/*<Route path='/laoban' component={Laoban}/>
          <Route path='/dashen' component={Dashen}/>
          <Route path='/message' component={Message}/>
          <Route path='/personal' component={Personal}/>*/}
          <Route componenr={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount} /> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, unReadCount: state.chat.unReadCount}),
  {getUser}
)(Main);