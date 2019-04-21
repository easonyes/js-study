import React from 'react';

class MarkdownEditor extends React.Component {
  constructor(prpos) {
    super(prpos);
    this.handleChange = this.handleChange.bind(this);
    this.rawMarkup = this.rawMarkup.bind(this);
    this.state = {
      value: 'Type some *markdown* here~',
    }
  }
  handleChange() {
    this.setState({value: this.refs.textarea.value});
  }
  // 将使用者输入的 Markdown 语法 parse 成 HTML 放入 DOM 中，React 通常使用 virtual DOM 作为
  // 和 DOM 沟通的中介，不建议直接由操作 DOM。故使用时的属性为 dangerouslySetInnerHTML
  rawMarkup() {
    // const md = new Remarkable();
    const md = new Remarkable();
    return { __html: md.render(this.state.value) };
  }
  render() {
    return (
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <textarea
          onChange={this.handleChange}
          ref="textarea"
          defaultValue={this.state.value} />
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.rawMarkup()}
        />
      </div>
    )
  }
}

export default MarkdownEditor;