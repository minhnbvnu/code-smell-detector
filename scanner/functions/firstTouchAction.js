function firstTouchAction(ev) {
    let ta = 'auto';
    let path = ev.composedPath && ev.composedPath();
    if (path) {
      for (let i = 0, n; i < path.length; i++) {
        n = path[i];
        if (n[TOUCH_ACTION]) {
          ta = n[TOUCH_ACTION];
          break;
        }
      }
    }
    return ta;
  }