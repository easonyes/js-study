/*
* 老板信息完善的路由容器组件
* */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import HeaderSelector from '../../components/header-selector/header-selector';
import {
  NavBar,
  List,
  InputItem,
  Button,
  WhiteSpace,
  WingBlank,
  TextareaItem
} from 'antd-mobile';

import {updateUser} from '../../redux/actions';


class LaobanInfo extends Component{

  state = {
    header: '',
    post: '',
    info: '',
    company: '',
    salary: '',
  };

  setHeader = (header) => {
    this.setState({
      header: header,
    })
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    })
  };

  save = () => {
    this.props.updateUser(this.state);
  };

  render() {

    const {header, type} = this.props.user;
    if (header) { // 说明信息已经完善
      const path = type === 'dashen' ? '/dashen' : '/laoban';
      return <Redirect to={path}/>
    }

    return (
      <div>
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <WingBlank>
          <List>
            <WhiteSpace/>
            <InputItem onChange={val => {this.handleChange('post', val)}}>招聘职位：</InputItem>
            <WhiteSpace/>
            <InputItem onChange={val => {this.handleChange('company', val)}}>公司名称：</InputItem>
            <WhiteSpace/>
            <InputItem onChange={val => {this.handleChange('salary', val)}}>职位薪资：</InputItem>
            <WhiteSpace/>
            <TextareaItem title={'职位要求：'}
                          rows={3}
                          onChange={val => {this.handleChange('info', val)}}
            />
          </List>
        </WingBlank>
        <Button type={"primary"} onClick={this.save}>保存</Button>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(LaobanInfo)