function defaultHandlerWrapper(element, event, handler) {
  handler.call(element, event);
}