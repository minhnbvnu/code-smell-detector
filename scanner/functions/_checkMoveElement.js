function _checkMoveElement($el) {
    if ($el.length === 0) return null;
    if ($el.is(_dragHandler)) return null; // not self
    // context
    const context = $el[0].__eb_dragContext;
    if (!context) return null;
    if (context.scene !== _dragContext.scene) return null; // not same scene

    // check if can drop
    return _getDropElement($el, context, _dragElement, _dragContext);
  }