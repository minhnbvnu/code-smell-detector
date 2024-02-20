function getHiResTimestamp3() {
    let timestamp;
    if (isBrowser5 && "performance" in window_4) {
      var _window$performance, _window$performance$n;
      timestamp = window_4 === null || window_4 === void 0 ? void 0 : (_window$performance = window_4.performance) === null || _window$performance === void 0 ? void 0 : (_window$performance$n = _window$performance.now) === null || _window$performance$n === void 0 ? void 0 : _window$performance$n.call(_window$performance);
    } else if ("hrtime" in process_2) {
      var _process$hrtime;
      const timeParts = process_2 === null || process_2 === void 0 ? void 0 : (_process$hrtime = process_2.hrtime) === null || _process$hrtime === void 0 ? void 0 : _process$hrtime.call(process_2);
      timestamp = timeParts[0] * 1e3 + timeParts[1] / 1e6;
    } else {
      timestamp = Date.now();
    }
    return timestamp;
  }