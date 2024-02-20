function hideTooltip() {
    bus.fire('show-tooltip', hideTooltipArgs);
    removeHighlight();
  }