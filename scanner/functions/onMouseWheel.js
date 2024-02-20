function onMouseWheel(e) {
      var deltaX = 0, deltaY = 0;
      if (e.type == "DOMMouseScroll") { // Firefox
        var delta = -e.detail * 8.0;
        if (e.axis == e.HORIZONTAL_AXIS) deltaX = delta;
        else if (e.axis == e.VERTICAL_AXIS) deltaY = delta;
      } else if (e.wheelDeltaX !== undefined && e.wheelDeltaY !== undefined) { // WebKit
        deltaX = e.wheelDeltaX / 3.0;
        deltaY = e.wheelDeltaY / 3.0;
      } else if (e.wheelDelta !== undefined) { // IE or Opera
        deltaY = e.wheelDelta / 3.0;
      }

      var scrolled = false;
      deltaX = chopDelta(deltaX);
      deltaY = chopDelta(deltaY);
      if ((deltaX > 0 && scroller.scrollLeft > 0) ||
          (deltaX < 0 && scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth)) {
        scroller.scrollLeft -= deltaX;
        scrolled = true;
      }
      if ((deltaY > 0 && scrollbar.scrollTop > 0) ||
          (deltaY < 0 && scrollbar.scrollTop + scrollbar.clientHeight < scrollbar.scrollHeight)) {
        scrollbar.scrollTop -= deltaY;
        scrolled = true;
      }
      if (scrolled) e_stop(e);
    }