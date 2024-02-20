function patchBeforeRoute(beforeRoute) {
  var meta = document.head.querySelector('meta[name="data-spm"]');
  var spmA = meta ? meta.content : null;

  if (!spmA) {
    return beforeRoute;
  }

  return function (defined) {
    var spmB = defined.spmB;

    if (spmB) {
      if (!window.AliMonitorQueue) {
        window.AliMonitorQueue = [];
      }

      document.body.dataset.spm = spmB;
      window.AliMonitorQueue.push(function () {
        window.AliMonitor.switchPage({
          spmA: spmA,
          spmB: spmB
        });
      });
    }

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    return beforeRoute ? beforeRoute.apply(void 0, [defined].concat(rest)) : true;
  };
}