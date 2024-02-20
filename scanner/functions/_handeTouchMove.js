function _handeTouchMove(e) {
    const $$ = Vue.prototype.$$;
    // el
    const handlerClassName = `*[data-dragdrop-handler="${_dragContext.scene}"]`;
    const elementClassName = `*[data-dragdrop-element="${_dragContext.scene}"]`;
    const _target = _getTouchTarget(e);
    let $el = $$(_target).closest(handlerClassName);
    if ($el.length === 0) {
      const $dragdropElement = $$(e.target).closest(elementClassName);
      if ($dragdropElement.length !== 0) {
        $el = $dragdropElement.find(handlerClassName);
      }
    }

    // drop element
    const res = _checkMoveElement($el);

    // tooltip
    const touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    const touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    _adjustTooltip(false, _dragContext, touchCurrentX, touchCurrentY, res ? res.tooltip : undefined);

    // switch
    const dropElementNew = res ? res.dropElement : null;
    const dropContextNew = dropElementNew ? $el[0].__eb_dragContext : null;
    const dropHandlerNew = dropElementNew ? $el : null;

    const _dropElementEl = _dropElement ? _dropElement[0] : null;
    const dropElementNewEl = dropElementNew ? dropElementNew[0] : null;
    if (_dropElementEl !== dropElementNewEl) {
      // leave
      if (_dropElement) {
        _dropContext.onDropLeave &&
          _dropContext.onDropLeave({ $el: _dropHandler, context: _dropContext, dropElement: _dropElement });
        _dropElement.removeAttr('data-dragdrop-drop');
      }
      // enter
      if (dropElementNew) {
        dropContextNew.onDropEnter &&
          dropContextNew.onDropEnter({ $el: dropHandlerNew, context: dropContextNew, dropElement: dropElementNew });
        dropElementNew.attr('data-dragdrop-drop', dropContextNew.scene);
      }
      // switch
      _dropElement = dropElementNew;
      _dropContext = dropContextNew;
      _dropHandler = dropHandlerNew;
    }

    _isMoved = true;
    e.preventDefault();
  }