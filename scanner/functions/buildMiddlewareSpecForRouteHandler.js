function buildMiddlewareSpecForRouteHandler(shim, path) {
  return new MiddlewareSpec({
    /**
     * A function where we can wrap next, reply send, etc. methods
     *
     * This one is tricky.  The `next` function will, same as
     * the `req` function above, receives the fn, fnName,
     * and args from the handler function.  It _also_ receives
     * a `wrap` function.  This wrap function will allow us to
     * to bind a segment for any next function/method, or any
     * method that would finish the request handling (i.e.
     * `reply`, `respond`, etc.)
     *
     * This is far more useful when instrumenting actual middleware vs.
     * instrumenting a simple route handler.  However, if the route
     * handling API uses a method call for responding (vs. returning a value)
     * then this method is required/useful again.
     *
     * The isFinal param determines whether or not a path is appended for
     * this particular piece of middleware. (i.e. if this is the final handler
     * that is actually handling the request, the path is actually left on)
     *
     * @param shim
     * @param fn
     * @param fnName
     * @param args
     * @param bindSegment
     */
    next: function wrapNext(shim, fn, fnName, args, bindSegment) {
      const reply = args[1]
      if (!shim.isFunction(reply)) {
        return
      }
      const isFinal = true
      bindSegment(reply, 'send', isFinal)
    },
    params: getParamsFromFastifyRequest,
    req: getRequestFromFastify,
    route: path
  })
}