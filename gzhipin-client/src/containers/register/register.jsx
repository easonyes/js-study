/*
* 注册路由组件
* */
import React, {Component} from 'react';
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button,
  Radio
} from 'antd-mobile';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {register} from '../../redux/actions';
import Logo from '../../components/logo/logo';

const ListItem = List.Item;

class Register extends Component{

  state = {
    username: '', //用户名
    password: '', //密码
    password2: '', // 确认密码
    type: 'dashen', // 用户类型名称： 大神 / 老板
  };

  register = () => {
    // console.log(this.state);
    this.props.register(this.state);
  };

  // 处理输入数据的改变： 跟新对应的状态
  handleChange = (name, val) => {
    // 更新状态
    this.setState({
      [name]: val // 属性名不是 name，而是 name 的值
    })
  };

  toLogin = () => {
    this.props.history.replace('/login');
  };

  render() {
    const type = this.state.type;
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
            <WhiteSpace/>
            <InputItem type="password" onChange={val => {this.handleChange('password2', val)}}>确认密码：</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>用户类型</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='dashen'} onChange={() => this.handleChange('type', 'dashen')}>大神</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='laoban'} onChange={() => this.handleChange('type', 'laoban')}>老板</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type="primary" onClick={this.register}>注册</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {register}
)(Register);