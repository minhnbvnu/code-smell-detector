function cleanup() {
    delete window[key];
    script.parentNode.removeChild(script);
  }