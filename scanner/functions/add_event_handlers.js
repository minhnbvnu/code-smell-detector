function add_event_handlers(block, target, handlers2) {
    handlers2.forEach((handler) => add_event_handler(block, target, handler));
  }