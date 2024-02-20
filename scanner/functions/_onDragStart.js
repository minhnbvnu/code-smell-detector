function _onDragStart($el, context, dragElement) {
    if (!context.onDragStart) return { size: _windowSize, tooltip: undefined };
    const res = context.onDragStart({ $el, context, dragElement });
    if (res === undefined) return { size: _windowSize, tooltip: undefined };
    if (res) {
      if (!res.size) res.size = _windowSize;
      return res;
    }
    return null;
  }