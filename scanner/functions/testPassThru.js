function testPassThru(method, args) {
  tap.test(fmt('driver passes %s to container', method), function(t) {
    var server = mockServer;
    var logger = {};
    var d = new Driver({
      Container: Container,
      baseDir: __dirname,
      console: logger,
      server: server,
      wsRouter: mockRouter,
    });
    var instanceId = 'x-z';

    function Container(options) {
      t.equal(options.instanceId, instanceId);
      var c = {
        on: function() {},
        setStartOptions: _.noop,
      };
      c[method] = function(arg1, arg2) {
        t.equivalent(arg1, args[1]);
        t.equivalent(arg2, args[2]);
      };
      return c;
    }

    t.plan(3);

    args.unshift(instanceId);

    console.assert(d[method]);

    d[method].apply(d, args);
  });
}