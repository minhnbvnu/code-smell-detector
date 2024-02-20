function tapFocusOutActive() {
  var ele = tapActiveElement();
  if (ele && ((/^(input|textarea|select)$/i).test(ele.tagName) || ele.isContentEditable)) {
    //console.log('tapFocusOutActive', ele.tagName);
    ele.blur();
  }
  tapActiveElement(null);
}