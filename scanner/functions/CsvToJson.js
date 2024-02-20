function CsvToJson(_input, _config, UserDefinedStreamer) {
    _config = _config || {};
    var dynamicTyping = _config.dynamicTyping || false;
    if (isFunction(dynamicTyping)) {
      _config.dynamicTypingFunction = dynamicTyping;
      dynamicTyping = {};
    }
    _config.dynamicTyping = dynamicTyping;
    _config.transform = isFunction(_config.transform) ? _config.transform : false;
    if (_config.worker && Papa.WORKERS_SUPPORTED) {
      var w = newWorker();
      w.userStep = _config.step;
      w.userChunk = _config.chunk;
      w.userComplete = _config.complete;
      w.userError = _config.error;
      _config.step = isFunction(_config.step);
      _config.chunk = isFunction(_config.chunk);
      _config.complete = isFunction(_config.complete);
      _config.error = isFunction(_config.error);
      delete _config.worker;
      w.postMessage({
        input: _input,
        config: _config,
        workerId: w.id
      });
      return;
    }
    var streamer = null;
    if (typeof _input === "string") {
      streamer = new StringStreamer(_config);
    }
    if (!streamer) {
      streamer = new UserDefinedStreamer(_config);
    }
    return streamer.stream(_input);
  }