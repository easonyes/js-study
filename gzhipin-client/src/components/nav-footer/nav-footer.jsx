/*
* 底部导航组件
* */
import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

const Item = TabBar.Item;

class NavFooter extends Component{

  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired,
  };

  render() {
    let {navList, unReadCount} = this.props;
    // 过滤掉 hide 为 true 的 nav
    navList = navList.filter(nav => !nav.hide);
    const pathname = this.props.location.pathname;
    return (
      <div className='nav-footer'>
        <TabBar>
          {
            navList.map((nav) => (
              <Item key={nav.path}
                    badge={nav.icon==='message' ? unReadCount : 0}
                    title={nav.text}
                    icon={{uri: require(`./imgs/${nav.icon}.png`)}}
                    selectedIcon={{uri: require(`./imgs/${nav.icon}-selected.png`)}}
                    selected={pathname === nav.path}
                    onPress={() => this.props.history.replace(nav.path)}

              />
            ))
          }
        </TabBar>
      </div>
    );
  }
}

export default withRouter(NavFooter); // 向外暴露withRouter()包装产生的组件
