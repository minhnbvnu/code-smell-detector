function _getDragElement($el, context) {
    if (!context.onDragElement) return $el;
    const res = context.onDragElement({ $el, context });
    if (res === undefined) return $el;
    if (res) return res;
    return null;
  }