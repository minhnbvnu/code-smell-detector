function flatXMLIndent(state) {
      var tagName = state.tagName;
      state.tagName = null;
      var result = xmlMode.indent(state, "");
      state.tagName = tagName;
      return result
    }