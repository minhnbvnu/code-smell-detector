function injectEmberDebug(fileName) {
    var script = document.createElement('script');
    script.src = url + '/' + fileName;
    document.body.appendChild(script);
  }