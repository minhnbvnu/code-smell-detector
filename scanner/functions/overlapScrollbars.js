function overlapScrollbars() {
      var tmpSb = document.createElement('div'),
          tmpSbInner = document.createElement('div');
      tmpSb.className = "CodeMirror-scrollbar";
      tmpSb.style.cssText = "position: absolute; left: -9999px; height: 100px;";
      tmpSbInner.className = "CodeMirror-scrollbar-inner";
      tmpSbInner.style.height = "200px";
      tmpSb.appendChild(tmpSbInner);

      document.body.appendChild(tmpSb);
      var result = (tmpSb.offsetWidth <= 1);
      document.body.removeChild(tmpSb);
      return result;
    }