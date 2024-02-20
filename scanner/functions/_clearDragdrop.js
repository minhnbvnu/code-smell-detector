function _clearDragdrop() {
    if (_isDragging) {
      // tooltip
      if (_tooltipElement) {
        _tooltipElement.hide();
        _tooltipElement.text('');
      }
      // cursor
      _stylesheet.innerHTML = '';
      // dropElement
      if (_dropElement) {
        _dropContext.onDropLeave &&
          _dropContext.onDropLeave({ $el: _dropHandler, context: _dropContext, dropElement: _dropElement });
        _dropElement.removeAttr('data-dragdrop-drop');
      }
      // dragElement
      if (_dragElement) {
        _dragContext.onDragEnd &&
          _dragContext.onDragEnd({ $el: _dragHandler, context: _dragContext, dragElement: _dragElement });
        _dragElement.removeAttr('data-dragdrop-drag');
      }
    }
    _isMoved = false;
    _isDragging = false;
    _dragHandler = null;
    _dragElement = null;
    _dragContext = null;
    _dropHandler = null;
    _dropElement = null;
    _dropContext = null;
    _dragContainerSize = {};
    _touchStart = {};
    _tooltipDrag = '';
    _tooltipText = '';
  }