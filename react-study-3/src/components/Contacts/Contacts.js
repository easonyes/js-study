import React from 'react';

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

  handleClick = () => {
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
        <form onSubmit={this.handleClick}>
          <input onChange={this.onChange}/>
          <button>提交</button>
        </form>
      </div>
    );
  }
}

export default FindFirstFew;