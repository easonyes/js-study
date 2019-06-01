/*
* 个人界面路由容器组件
* */
import React, {Component} from 'react';
import {Button, List, Modal, Result, WhiteSpace} from "antd-mobile";
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {resetUser} from '../../redux/actions';

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends Component{

  logout = () => {
    Modal.alert('退出','确认退出登录吗?',[
      {
        text: '取消',
      },
      {
        text: '确定',
        onPress: () => {
          // 退出登录 1.干掉cookie中的 userid 2.干掉redux中的 user
          Cookies.remove('userid');
          this.props.resetUser();
        }
      }
    ])
  };

  render() {
    const {username, type, header, company, salary, post, info} = this.props.user;
    return (
      <div style={{marginBottom: 50, marginTop: 45}}>
        <Result
          img={<img src={require(`../../assets/img/${header}.png`)} alt=""/>}
          title={username}
          message={company}
        />

        <List renderHeader={() => type==='laoban' ? '招聘信息' : '求职信息'}>
          <Item multipleLine>
            <Brief>职位：{post}</Brief>
            <Brief>简介：{info}</Brief>
            {salary ? <Brief>薪资：{salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <Button type='warning' onClick={this.logout}>退出登录</Button>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal);