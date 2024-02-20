function _getDropElement($el, context, dragElement, dragContext) {
    if (!context.onDropElement) return { dropElement: $el, tooltip: undefined };
    const res = context.onDropElement({ $el, context, dragElement, dragContext });
    if (res === undefined) return { dropElement: $el, tooltip: undefined };
    if (res) return res;
    return null;
  }