function ArrayRender(props) {
  return [
    <div className="test" key="test">
      Test
    </div>,
    <div className="test2" key="test2">
      Test 2
    </div>,
    <div className="child" key="child">
      {props.children}
    </div>,
  ];
}