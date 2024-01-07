function addFakeSpaces(width, strBuf) {
      if (width < textContentItem.fakeSpaceMin) {
        return;
      }

      if (width < textContentItem.fakeMultiSpaceMin) {
        strBuf.push(" ");
        return;
      }

      var fakeSpaces = Math.round(width / textContentItem.spaceWidth);

      while (fakeSpaces-- > 0) {
        strBuf.push(" ");
      }
    }