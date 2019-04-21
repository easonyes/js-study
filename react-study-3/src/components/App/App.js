import React from 'react';
import { Link } from 'react-router-dom';
// import styles from './appStyles';
// import NavLink from '../NavLink';
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';

const App = (props) => (
  <div>
    <h1>React Router Tutorial</h1>
    <ul>
      <li><Link to="/" activeClassName="active">Home</Link></li>
      <li><Link to="/about" activeStyle={{ color: 'green' }}>About</Link></li>
      <li><NavLink isActive={() => (false)} to="/repos" activeStyle={{color: 'skyblue', fontWeight: 'bold'}}>Repos</NavLink></li>
      <li><Link to="/user" activeClassName="active">User</Link></li>
      <li><NavLink to="/contacts">Contacts</NavLink></li>
    </ul>
    {/*// <!-- 我们将 App 组件当做每个组件都会加载的母模版，因此可以透过 children 加载对应 URL 的子组件 -->*/}
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.object,
};

export default App;