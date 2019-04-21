import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import App from "react-scripts/template-typescript/src/App";

class HelloMessage extends React.Component{
  // 若是需要绑定 this.方法，或者是需要在 constructor 使用 props， 定义state
  // 就要 constructor 。若是在其他方法（如 render ）使用 this.props 则不用一定要定义
  constructor(props) {
    // 对于 OOP 面向对象程序设计熟悉的读者应该对于 constructor 建构子的使用不陌生
    // 事实上它是 ES6 的语法糖， 骨子里还是 prototype based 面向对象程序语言。
    // 通过 extends 可以继承 React.Component 父类别。super 方法可以调用继承父类别的建构子
    super(props);
    this.state = {};
  }
  // render 是唯一必须的方法，但如果是单纯 render UI 建议使用 Functional Component 写法
  // 性能较佳且简洁
  render() {
    return (
      <div>Hello {this.props.name}</div>
    );
  }
}

// PropTypes 验证，若传入的 props type 不是 string 将会显示错误
HelloMessage.propTypes = {
  name: React.PropTypes.string,
}

// Prop 预设值，若对应 props 没传入值将会使用 default 值 Zuck
HelloMessage.defaultProps = {
  name: 'Zuck',
}


export default App;
