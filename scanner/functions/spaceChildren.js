function spaceChildren(children, needInserted) {
  var isPrevChildPure = false;
  var childList = [];
  external_window_React_["Children"].forEach(children, function (child) {
    var type = button_typeof(child);
    var isCurrentChildPure = type === 'string' || type === 'number';
    if (isPrevChildPure && isCurrentChildPure) {
      var lastIndex = childList.length - 1;
      var lastChild = childList[lastIndex];
      childList[lastIndex] = "".concat(lastChild).concat(child);
    } else {
      childList.push(child);
    }
    isPrevChildPure = isCurrentChildPure;
  }); // Pass to React.Children.map to auto fill key

  return external_window_React_["Children"].map(childList, function (child) {
    return insertSpace(child, needInserted);
  });
}