function followScriptTagById(id) {
    var element = document.getElementById(id);
    return element ? element.text : id;
  }