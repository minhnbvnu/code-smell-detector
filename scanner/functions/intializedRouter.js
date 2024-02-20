function intializedRouter() {
  var app = new MockLocomotive();
  var router = new Router(app);
  var http = new MockExpress();
  function handle(controller, action) {
    return function() {
      return { controller: controller, action: action };
    };
  }
  
  router.init(http, { handle: handle });
  return router;
}