function textForIcon(text) {
      if (text && /icon/.test(text)) {
        scope.$actionSheetHasIcon = true;
      }
    }