function doAction(queue, context, scope, args) {
  if (!queue) {
    return;
  }

  queue = queue.slice(0);

  var _resolve;

  var i = new Promise(function (resolve) {
    _resolve = resolve;
  });

  var fail = function fail(e) {
    if (false) {
      reportError(e);
    } else {
      console.error(e); // tslint:disable-line
    }
  };

  var next = function next(previousResult) {
    var item = queue.shift();

    if (!item) {
      return _resolve();
    }

    var res;

    try {
      var actionContextData = derive(scope, __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({
        previousResult: previousResult
      }, item.params));
      res = item.fn.apply(context, args.concat([actionContextData]));
    } catch (e) {
      return fail(e);
    }

    if (res === false) {
      // interrupt
      return null;
    }

    if (res && res.then) {
      res.then(next).catch(fail);
    } else if (res instanceof Error) {
      fail(res);
    } else {
      next(res);
    }

    return null;
  };

  next();
  return i;
}