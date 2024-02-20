function startLeavingVisibleTimer() {
  window.clearTimeout(leavingVisibleTimer);
  leavingVisibleTimer = window.setTimeout(function () {
    return send({
      type: TooltipEvents.TimeComplete
    });
  }, LEAVE_TIMEOUT);
}