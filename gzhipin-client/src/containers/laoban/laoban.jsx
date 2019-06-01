/*
* 老板主界面路由容器组件
* */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'


class Laoban extends Component{
  componentDidMount() {
    // 获取 userList
    this.props.getUserList('dashen')
  }

  render() {
    return (
      <div>
        <UserList userList={this.props.userList} />
      </div>
    );
  }
}

export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(Laoban);