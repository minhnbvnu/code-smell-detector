function initPanels(cm) {
    var wrap = cm.getWrapperElement();
    var style = window.getComputedStyle ? window.getComputedStyle(wrap) : wrap.currentStyle;
    var height = parseInt(style.height);
    var info = cm.state.panels = {
      setHeight: wrap.style.height,
      panels: [],
      wrapper: document.createElement("div")
    };
    wrap.parentNode.insertBefore(info.wrapper, wrap);
    var hasFocus = cm.hasFocus();
    info.wrapper.appendChild(wrap);
    if (hasFocus) cm.focus();

    cm._setSize = cm.setSize;
    if (height != null) cm.setSize = function (width, newHeight) {
      if (!newHeight) newHeight = info.wrapper.offsetHeight;
      info.setHeight = newHeight;
      if (typeof newHeight != "number") {
        var px = /^(\d+\.?\d*)px$/.exec(newHeight);
        if (px) {
          newHeight = Number(px[1]);
        } else {
          info.wrapper.style.height = newHeight;
          newHeight = info.wrapper.offsetHeight;
        }
      }
      var editorheight = newHeight - info.panels
        .map(function (p) { return p.node.getBoundingClientRect().height; })
        .reduce(function (a, b) { return a + b; }, 0);
      cm._setSize(width, editorheight);
      height = newHeight;
    };
  }