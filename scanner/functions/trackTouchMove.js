function trackTouchMove(e) //{{{
      {
        onMove(mouseAbs(Touch.cfilter(e)));
        return false;
      }