function storeCurrentSize(element, width, height) {
        getState(element).lastWidth = width;
        getState(element).lastHeight = height;
      }