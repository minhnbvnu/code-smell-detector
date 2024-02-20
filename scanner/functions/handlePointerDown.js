function handlePointerDown(e) {
    !isMobile && e.target.setPointerCapture(e.pointerId);
    const { clientX, clientY } = isMobile ? e.targetTouches[0] : e;
    setOrigin({
      x: position.x,
      y: position.y,
      w: size.w,
      h: size.h,
      clientX,
      clientY,
    });
  }