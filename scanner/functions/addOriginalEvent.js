function addOriginalEvent (detail, evt) {
      if (originalEvent instanceof MouseEvent) {
        detail.mouseEvent = originalEvent;
      } else if (typeof TouchEvent !== 'undefined' &&
                 originalEvent instanceof TouchEvent) {
        detail.touchEvent = originalEvent;
      }
    }