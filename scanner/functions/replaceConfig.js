function replaceConfig(config2) {
      var configCopy = copy(config2);
      configCopy.chunkSize = parseInt(configCopy.chunkSize);
      if (!config2.step && !config2.chunk)
        configCopy.chunkSize = null;
      this._handle = new ParserHandle(configCopy);
      this._handle.streamer = this;
      this._config = configCopy;
    }