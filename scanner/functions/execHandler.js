function execHandler({ event, handler, middleware }) {
  if (middleware(event)) {
    handler(event)
  }
}