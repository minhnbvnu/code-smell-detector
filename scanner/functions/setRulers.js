function setRulers(cm) {
    var val = cm.getOption("rulers");
    var cw = cm.defaultCharWidth();
    var left = cm.charCoords(CodeMirror.Pos(cm.firstLine(), 0), "div").left;
    var minH = cm.display.scroller.offsetHeight + 30;
    for (var i = 0; i < val.length; i++) {
      var elt = document.createElement("div");
      elt.className = "CodeMirror-ruler";
      var col, cls = null, conf = val[i];
      if (typeof conf == "number") {
        col = conf;
      } else {
        col = conf.column;
        if (conf.className) elt.className += " " + conf.className;
        if (conf.color) elt.style.borderColor = conf.color;
        if (conf.lineStyle) elt.style.borderLeftStyle = conf.lineStyle;
        if (conf.width) elt.style.borderLeftWidth = conf.width;
        cls = val[i].className;
      }
      elt.style.left = (left + col * cw) + "px";
      elt.style.top = "-50px";
      elt.style.bottom = "-20px";
      elt.style.minHeight = minH + "px";
      cm.display.lineSpace.insertBefore(elt, cm.display.cursorDiv);
    }
  }