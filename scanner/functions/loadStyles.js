function loadStyles(srcs) {
    let ss = document.createElement("link"),
      src = srcs.shift();

    ss.type = "text/css";
    ss.rel = "stylesheet";
    ss.onload = function() {
      if (srcs.length) {
        loadStyles(srcs);
      }
    };
    ss.href = src;
    document.getElementsByTagName("head")[0].appendChild(ss);
  }