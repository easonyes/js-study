import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      count: 0,
    };
  }

  handleClick(e) {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.handleClick}>点一下试试</button>
      </div>
    );
  }

}

// class Pk extends Component {
//   constructor(props) {
//     super(props);
//
//     this.handleChange = this.handleChange.bind(this);
//
//     this.state = {
//       area: ['yichun', 'hangzhou', 'beijing'],
//     };
//   }
//
//   handleChange(e) {
//     const { options } = e.target;
//     // 注意，这里返回的 options 是一个对象，并非数组
//     const area = Object.keys(options)
//       .filter(i => options[i].select === true)
//       .map(i => options[i].value);
//
//     this.setState({
//       area,
//     });
//   }
//
//   render() {
//     const { area } = this.state;
//
//     return (
//       <select multiple={true} value={area} onChange={this.handleChange}>
//         <option value="yichun">宜春</option>
//         <option value="beijing">背景</option>
//         <option value="nanchang">南昌</option>
//         <option value="shanghai">上海</option>
//         <option value="hangzhou">杭州</option>
//       </select>
//     );
//   }
// }

// class Pk extends Component {
//
//   render() {
//     return (
//       <div>
//         hello
//       </div>
//     );
//   }
// }
// const style = {
//   color: 'skyblue',
// };

// class ListItem extends Component {
//   static defaultPros = {
//     text: '',
//     checked: false,
//   };
//
//   render() {
//     return (
//       <li>
//         <input type="checkbox" checked={this.props.checked}
//         onChange={this.props.onChange}/>
//         <span>{this.props.value}</span>
//       </li>
//     );
//   }
// }

// class List extends Component {
//     static defaultProps = {
//       list: [],
//       handleItemChange: () => {},
//     };
//
//     constructor(props){
//       super(props);
//
//       this.state = {
//         list: this.props.list.map(entry => ({
//           text: entry.text,
//           checked: entry.checked,
//         })),
//       };
//     }
//
//
//   onItemChange(entry){
//     const { list } = this.state;
//     this.setState({
//       list: list.map(prevEntry => ({
//         text: prevEntry.text,
//         checked: prevEntry.text === entry.text ?
//           !prevEntry.checked : prevEntry.checked,
//       })),
//     });
//     this.props.handleItemChange(entry);
//   }
//
//   render() {
//       return (
//         <div>
//           <ul>
//             {this.state.list.map((entry, index) => (
//               <ListItem
//                 key={`list-${index}`}
//                 value={entry.text}
//                 checked={entry.checked}
//                 onChange={this.onItemChange.bind(this, entry)}
//               />
//             ))}
//           </ul>
//         </div>
//       );
//   }
// }


// class ListItem extends Component{
//   static contextTypes = {
//     color: PropTypes.string,
//   };
//   render() {
//     const { value } = this.props;
//
//     return (
//       <li style={{background: this.context.color}}>
//         <span>{value}</span>
//       </li>
//     );
//   }
// }

// class List extends Component{
//   static childContextTypes = {
//     color: PropTypes.string,
//   };
//
//   getChildContext() {
//     return {
//       color: 'red',
//     };
//   }
//
//   render() {
//     const { list } = this.props;
//
//     return (
//       <div>
//         <ul>
//           {list.map((entry, index) => (
//             <ListItem key={`list-${index}`} value={entry.text} />
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// class Pk extends Component {
//
//       render() {
//         return(
//           <List
//             list={[{text: 1}, {text: 2}]}
//           />
//         );
//       }
// }

class SelectInput extends Component {
  static displayName = 'SelectInput';

  render() {
    const { selectedItem, isActive, onClickHeader, placeholder } = this.props;
    const { text } = selectedItem;

    return (
      <div>
        <div onClick={onClickHeader}>
          <input
            type="text"
            disabled
            value={text}
            placeholder={placeholder}
          />
          {/*<Icon className={isActive} name="angle-down" />*/}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<SelectInput selectedItem={'asd'} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
