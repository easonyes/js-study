/*
* 登录界面路由组件
* */
import React, {Component} from 'react';
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {login, register} from '../../redux/actions';
import Logo from '../../components/logo/logo';

const ListItem = List.Item;

class Login extends Component{
  state = {
    username: '', //用户名
    password: '', //密码
  };

  // 处理输入数据的改变： 跟新对应的状态
  handleChange = (name, val) => {
    // 更新状态
    this.setState({
      [name]: val // 属性名不是 name，而是 name 的值
    })
  };

  login = () => {
    // console.log(this.state);
    this.props.login(this.state);
  };

  toRegister = () => {
    this.props.history.replace('/register');
  };

  render() {
    const {msg, redirectTo} = this.props.user;
    // 如果 redirectTo 有值，就需要重定向到指定的路由
    if (redirectTo){
      return <Redirect to={redirectTo} />
    }
    return (
      <div>
        <NavBar>小七直聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg ? <div className='error-msg'>{msg}</div> : null}
            <InputItem onChange={val => {this.handleChange('username', val)}}>用户名：</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={val => {this.handleChange('password', val)}}>密码：</InputItem>
            <Button type="primary" onClick={this.login}>登录</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {login}
)(Login);