function handeTouchEnd(/* e*/) {
    // clear delay
    if (_delayTimeoutId) {
      window.clearTimeout(_delayTimeoutId);
      _delayTimeoutId = 0;
    }

    if (_dragContext && _dragContext.resizable === true) {
      _clearDragdrop();
      return;
    }

    if (!_isDragging || !_isMoved) {
      _clearDragdrop();
      return;
    }

    // drop done
    if (_dropElement) {
      _dragContext.onDragDone &&
        _dragContext.onDragDone({
          $el: _dragHandler,
          context: _dragContext,
          dragElement: _dragElement,
          dropElement: _dropElement,
          dropContext: _dropContext,
        });
    }

    // clear
    _clearDragdrop();
  }