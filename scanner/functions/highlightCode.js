function highlightCode() {
    var code = document.getElementsByTagName('code');
    for (var i = 0, len = code.length; i < len; ++i) {
      code[i].innerHTML = highlight(code[i].innerHTML);
    }
  }