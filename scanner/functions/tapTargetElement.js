function tapTargetElement(ele) {
  if (ele && ele.tagName === 'LABEL') {
    if (ele.control) return ele.control;

    // older devices do not support the "control" property
    if (ele.querySelector) {
      var control = ele.querySelector('input,textarea,select');
      if (control) return control;
    }
  }
  return ele;
}