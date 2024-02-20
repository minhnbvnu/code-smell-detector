function expandTagUnderCursor(cm, head, inclusive) {
      var cur = head;
      if (!CodeMirror.findMatchingTag || !CodeMirror.findEnclosingTag) {
        return { start: cur, end: cur };
      }

      var tags = CodeMirror.findMatchingTag(cm, head) || CodeMirror.findEnclosingTag(cm, head);
      if (!tags || !tags.open || !tags.close) {
        return { start: cur, end: cur };
      }

      if (inclusive) {
        return { start: tags.open.from, end: tags.close.to };
      }
      return { start: tags.open.to, end: tags.close.from };
    }