function queued(t) {
  var queue = [];
  var newT = {
    queue: queue,
    waiton: partial(addStep, queue, waiton, t),
    wait: partial(addStep, queue, wait, t),
    expect: partial(addStep, queue, expect, t),
    failon: partial(addStep, queue, failon, t),
    shutdown: partial(runTests, queue, t),
    test: subTest,
  };
  ['equal', 'notEqual', 'assert', 'end', 'doesNotThrow'].forEach(function(m) {
    newT[m] = function() {
      t[m].apply(t, arguments);
    };
  });

  // Each waiton() adds a listener... so we pass the limit of 10.
  t.setMaxListeners(50);

  return newT;

  function subTest(name, opts, cb) {
    if (!cb && typeof opts === 'function') {
      cb = opts;
      opts = {};
    }
    queue.push(function(next) {
      t.test(name, function(subT) {
        var subQueued = queued(subT);
        subT.on('end', next);
        cb(subQueued);
        runTests(subQueued.queue, subT);
      });
    });
  }

  function runTests(queue, t, server) {
    console.log('# running queued tests... (%d)', queue.length);
    async.series(queue, function() {
      if (server) {
        server.on('exit', function(code, signal) {
          debug('server exit: code %j signal %j', code, signal);
          t.notEqual(code, 0, 'pm server shutdown by us');
          t.end();
        });
        setTimeout(server.kill.bind(server, 'SIGTERM'), 2000);
      } else {
        t.end();
      }
    });
  }

  function addStep(queue, f, t, c, p) {
    var stack = Error().stack.split(/\n/);
    // keep first line, skip 3, keep rest, recombine
    stack = stack.slice(0, 1).concat(stack.slice(4)).join('\n');
    queue.push(partial(f, t, {stack: stack}, c, p));
  }
}