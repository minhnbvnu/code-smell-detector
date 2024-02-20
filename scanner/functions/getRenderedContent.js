function getRenderedContent() {
  var content = app.refs.content || app.refs.router;
  var node = ReactDOM.findDOMNode(content);
  return node.textContent || node.innerText;
}