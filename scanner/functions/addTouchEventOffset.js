function addTouchEventOffset(t) {
      var offset = calculateOffset(t.changedTouches[0].target, t.changedTouches[0]),
        i;
      for (i = 0; i < t.touches.length; i++) {
        var touch = t.touches[i];
        touch.offsetX = touch.pageX - offset.X;
        touch.offsetY = touch.pageY - offset.Y
      }
      for (i = 0; i < t.targetTouches.length; i++) {
        var targetTouch = t.targetTouches[i];
        targetTouch.offsetX = targetTouch.pageX - offset.X;
        targetTouch.offsetY = targetTouch.pageY - offset.Y
      }
      for (i = 0; i < t.changedTouches.length; i++) {
        var changedTouch = t.changedTouches[i];
        changedTouch.offsetX = changedTouch.pageX - offset.X;
        changedTouch.offsetY = changedTouch.pageY - offset.Y
      }
      return t
    }