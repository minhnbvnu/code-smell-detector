function onTouchEnd(e) {
    let now = new Date();
    let dTouchEnd = now - lastTouchEndTime;
    let dPan = now - lastPanTime;
    lastTouchEndTime = now;
    clearTimeout(clickTimeout);

    if (dPan < 500) {
      return;
    }
    if (dTouchEnd < 300) {
      onDoubleClick(e);
      return;
    }
    // console.log("tap", e.target);
    clickTimeout = setTimeout(() => onMouseClick(e), 320);
  }