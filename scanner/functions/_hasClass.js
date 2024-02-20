function _hasClass(el, cls) {
    return el.classList ? el.classList.contains(cls) : new RegExp("(^| )" + cls + "( |$)", "gi").test(el.cls);
  }