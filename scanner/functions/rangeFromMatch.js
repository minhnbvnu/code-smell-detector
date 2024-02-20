function rangeFromMatch(match) {
        var wrappers = getWrappersByIndex(indexOf(match));
        var rng = editor.dom.createRng();
        rng.setStartBefore(wrappers[0]);
        rng.setEndAfter(wrappers[wrappers.length - 1]);
        return rng;
      }