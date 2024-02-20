function Pointer({
  direction,
  size,
  setSize,
  position,
  setPosition,
  children,
  minSize,
  maxSize,
  ...props
}) {
  const [origin, setOrigin] = useState(null);

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

  function handlePointerMove(e) {
    const { clientX, clientY } = isMobile ? e.targetTouches[0] : e;
    if (origin) {
      const dx = clientX - origin.clientX;
      const dy = clientY - origin.clientY;
      let x = position.x;
      let y = position.y;
      let w = size.w;
      let h = size.h;

      switch (direction) {
        case "Header":
          x = origin.x + dx;
          y = origin.y + dy;
          break;
        case "TopLeft":
          x = origin.x + dx;
          y = origin.y + dy;
          w = origin.w - dx;
          h = origin.h - dy;
          break;
        case "Top":
          y = origin.y + dy;
          h = origin.h - dy;
          break;
        case "TopRight":
          y = origin.y + dy;
          w = origin.w + dx;
          h = origin.h - dy;
          break;
        case "Left":
          x = origin.x + dx;
          w = origin.w - dx;
          break;
        case "Right":
          w = origin.w + dx;
          break;
        case "BottomLeft":
          x = origin.x + dx;
          w = origin.w - dx;
          h = origin.h + dy;
          break;
        case "Bottom":
          h = origin.h + dy;
          break;
        case "BottomRight":
          w = origin.w + dx;
          h = origin.h + dy;
          break;
        default:
      }

      if (w < minSize.w) {
        w = minSize.w;
        x = position.x;
      }
      if (w > maxSize.w) {
        w = maxSize.w;
        x = position.x;
      }
      if (h < minSize.h) {
        h = minSize.h;
        y = position.y;
      }
      if (h > maxSize.h) {
        h = maxSize.h;
        y = position.y;
      }

      setPosition({ x, y });
      setSize({ w, h });
    }
  }

  function handlePointerUp(e) {
    e.stopPropagation();
    setOrigin(null);
  }

  const touchProps = isMobile
    ? {
        onTouchStart: handlePointerDown,
        onTouchMove: handlePointerMove,
        onTouchEnd: handlePointerUp,
      }
    : {
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
      };

  return (
    <div {...props} {...touchProps}>
      {children}
    </div>
  );
}