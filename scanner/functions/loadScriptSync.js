function loadScriptSync(src) {
    return new Promise(function(resolve, reject) {
      document.write('<script src="' + src +'"></script>');
      document.addEventListener('DOMContentLoaded', resolve);
    });
  }