import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const CharList = (props) => (
  <ul>
    {
      Object.keys(props.o).forEach((key) => (
        <li key={key}>{key + ',' + props.o[key]}</li>
      ))
    }
  </ul>
);

class FindFirstFew extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      o: {},
    }
  };

  onChange= (e) => {
    this.setState({text: e.target.value});
  };

  handleSubmit = (e) => {
    const nextO = {};
    for (let i=0, length=this.state.text.length; i<length; i++) {
      let char = this.state.text.charAt(i);
      if (nextO[char]) {
        nextO[char]++;
      }else {
        nextO[char] = 1;
      }
    }
    this.setState({o: nextO});
  };
  render() {
    return (
      <div>
        <CharList o={this.state.o} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange}/>
          <button>提交</button>
        </form>
      </div>
    );
  }
}

// TodoApp 组件中包含了显示 Todo 的 TodoList 组件，Todo 的内容通过 props 传入 TodoList
// 由于 TodoList 仅单纯 Render UI 不涉及内部 state 操作是 stateless component，所以
// 使用 Functional Component 写法。需要特别注意的是这边我们用 map function 来迭代 Todos，
// 需要留意的是每个迭代的元素必须要有 unique key 不然会发生错误（可以自定义id，或是使用
// map function 的第二个参数 index）
const TodoList = (props) => (
  <ul>
    {
      props.items.map((item) => (
        <li>{item.text}</li>
      ))
    }
  </ul>
);

// 整个 App 的主要组件，这边比较重要的是事件处理的部分，内部有
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      items: [],
      text: '',
    }
  }
  onChange(e) {
    this.setState({text: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    const nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
    const nextText = '';
    this.setState({items: nextItems, text: nextText});
  }
  render() {
    return (
      <div>
        <h2>TODO</h2>
        <TodoList items={this.state.items}/>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text}/>
          <button>{'ADD #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<FindFirstFew />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
