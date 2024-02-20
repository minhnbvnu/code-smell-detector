function handeTouchStart(e) {
    const $$ = Vue.prototype.$$;
    // el
    const $el = $$(e.target).closest('*[data-dragdrop-handler]');
    if ($el.length === 0) return;
    // context
    const context = $el[0].__eb_dragContext;
    if (!context) return;
    // delay
    _delayTimeoutId = window.setTimeout(() => {
      if (!_delayTimeoutId) return;
      _delayTimeoutId = 0;

      const isResizable = context.resizable === true;
      const isRow = context.resizeDirection === 'row';

      // touch
      _touchStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      _touchStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;

      // get drag element
      if (!isResizable) {
        _dragElement = $el[0].__eb_dragElement;
        if (!_dragElement) return; // break
      }
      // dragStart {size,tooltip}
      const res = _onDragStart($el, context, _dragElement);
      if (!res) return; // break

      // size
      _dragContainerSize = res.size;

      // tooltip
      _adjustTooltip(true, context, _touchStart.x, _touchStart.y, res.tooltip);

      // class
      if (!isResizable) _dragElement.attr('data-dragdrop-drag', context.scene);

      // cursor
      const cursor = isResizable ? (isRow ? 'row-resize' : 'col-resize') : 'move';
      const style = `html, html a.link {cursor: ${cursor} !important; -webkit-user-select: none !important;}`;
      _stylesheet.innerHTML = style;

      // ready
      _isMoved = false;
      _isDragging = true;
      _dragHandler = $el;
      _dragContext = context;
      _dropHandler = null;
      _dropElement = null;
      _dropContext = null;
    }, delayTimeout);
  }