function getLinkHrefInside(endChar) {
    return function(stream, state) {
      var ch = stream.next();

      if (ch === endChar) {
        state.f = state.inline = inlineNormal;
        if (modeCfg.highlightFormatting) state.formatting = "link-string";
        var returnState = getType(state);
        state.linkHref = false;
        return returnState;
      }

      stream.match(linkRE[endChar])
      state.linkHref = true;
      return getType(state);
    };
  }