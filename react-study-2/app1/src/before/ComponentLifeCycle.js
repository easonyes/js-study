import React from 'react';

class MyComponent extends React.Component{
  constructor(prpos) {
    super(prpos);
    console.log('constructor');
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: '小七',
    }
  }
  handleClick() {
    this.setState({'name': '老婆赖小七'});
  }
  componentWillMount() {
    console.log('componentWillMount');
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }
  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log('componentWillUpdate');
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  render() {
    return (
      <div onClick={this.handleClick}>你好哇，{this.state.name}</div>
    );
  }
}

export default MyComponent;