function callFnAsync(fn) {
    var result = fn.call(ctx, function(err) {
      if (err instanceof Error || toString.call(err) === '[object Error]') {
        return done(err);
      }
      if (err) {
        if (Object.prototype.toString.call(err) === '[object Object]') {
          return done(
            new Error('done() invoked with non-Error: ' + JSON.stringify(err))
          );
        }
        return done(new Error('done() invoked with non-Error: ' + err));
      }
      if (result && utils.isPromise(result)) {
        return done(
          new Error(
            'Resolution method is overspecified. Specify a callback *or* return a Promise; not both.'
          )
        );
      }

      done();
    });
  }