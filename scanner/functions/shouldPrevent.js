function shouldPrevent(deltaX, deltaY) {
    var scrollTop = Math.floor(element.scrollTop);
    const scrollLeft = Math.ceil(element.scrollLeft);
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (!i.settings.wheelPropagation) {
      return true;
    }

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (i.settings.suppressScrollY) {
        return false;
      }

      if (deltaY > 0) {
        return scrollTop !== 0;
      }

      if (deltaY < 0) {
        return scrollTop < i.contentHeight - i.containerHeight;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (i.settings.suppressScrollX) {
        return false;
      }
      if (deltaX > 0) {
        return scrollLeft !== 0;
      }

      if (deltaY < 0) {
        return scrollLeft < i.contentWidth - i.containerWidth;
      }
    }

    return true;
  }