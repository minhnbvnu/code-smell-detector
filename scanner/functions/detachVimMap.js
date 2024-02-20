function detachVimMap(cm, next) {
      if (this == CodeMirror.keyMap.vim) {
        CodeMirror.rmClass(cm.getWrapperElement(), "cm-fat-cursor");
        if (cm.getOption("inputStyle") == "contenteditable" && document.body.style.caretColor != null) {
          disableFatCursorMark(cm);
          cm.getInputField().style.caretColor = "";
        }
      }

      if (!next || next.attach != attachVimMap)
        leaveVimMode(cm);
    }