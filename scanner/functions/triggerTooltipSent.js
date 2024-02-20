function triggerTooltipSent(payloadSent) {
  return {
    type: actions.TRIGGER_TOOLTIP_SENT,
    payloadSent
  };
}