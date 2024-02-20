function startRestTimer() {
  window.clearTimeout(restTimeout);
  restTimeout = window.setTimeout(function () {
    send({
      type: TooltipEvents.Rest
    });
  }, MOUSE_REST_TIMEOUT);
}