function wrapMouseEvent(theirHandler, ourHandler) {
    // Use internal MouseEvent handler only if PointerEvent is not supported
    if (typeof window !== "undefined" && "PointerEvent" in window) {
      return theirHandler;
    }

    return composeEventHandlers(theirHandler, ourHandler);
  }