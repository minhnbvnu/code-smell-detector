function _handeTouchResize(e) {
    if (!_dragContext.onDragMove) return;
    _isMoved = true;

    const isRow = _dragContext.resizeDirection === 'row';

    const touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    const touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    const abs = {
      x: !isRow ? touchCurrentX - _touchStart.x : undefined,
      y: isRow ? touchCurrentY - _touchStart.y : undefined,
    };

    const percent = {
      x: !isRow ? abs.x / _dragContainerSize.width : undefined,
      y: isRow ? abs.y / _dragContainerSize.height : undefined,
    };

    const diff = { abs, percent };

    if (!isRow && abs.x === 0) return;
    if (isRow && abs.y === 0) return;

    // if (!isRow && Math.abs(abs.y) > Math.abs(abs.x)) return;
    // if (isRow && Math.abs(abs.x) > Math.abs(abs.y)) return;

    const res = _dragContext.onDragMove({ $el: _dragHandler, context: _dragContext, diff });

    // tooltip
    _adjustTooltip(false, _dragContext, touchCurrentX, touchCurrentY, res ? res.tooltip : undefined);

    if (!res || res.eaten !== true) {
      return; // continue
    }

    // reset
    _touchStart = { x: touchCurrentX, y: touchCurrentY };
    e.preventDefault();
  }