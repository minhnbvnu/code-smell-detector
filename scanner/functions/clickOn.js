function clickOn(component) {
  ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component), {button: 0});
}