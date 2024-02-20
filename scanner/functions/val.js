function val(content, msg) {
    return function(cm) { eq(cm.getValue(), content, msg); };
  }