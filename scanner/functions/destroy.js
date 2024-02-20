function destroy() {
      if ( scrollChild ) {
        ionic.off(touchStartEvent, handleTouchstart, scrollChild);
        ionic.off(touchMoveEvent, handleTouchmove, scrollChild);
        ionic.off(touchEndEvent, handleTouchend, scrollChild);
        ionic.off('mousedown', handleMousedown, scrollChild);
        ionic.off('mousemove', handleTouchmove, scrollChild);
        ionic.off('mouseup', handleTouchend, scrollChild);
      }
      if ( scrollParent ) {
        ionic.off('scroll', handleScroll, scrollParent);
      }
      scrollParent = null;
      scrollChild = null;
    }