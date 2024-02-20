function ChunkStreamer(config) {
    this._handle = null;
    this._finished = false;
    this._completed = false;
    this._input = null;
    this._baseIndex = 0;
    this._partialLine = "";
    this._rowCount = 0;
    this._start = 0;
    this._nextChunk = null;
    this.isFirstChunk = true;
    this._completeResults = {
      data: [],
      errors: [],
      meta: {}
    };
    replaceConfig.call(this, config);
    this.parseChunk = function(chunk, isFakeChunk) {
      if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk)) {
        var modifiedChunk = this._config.beforeFirstChunk(chunk);
        if (modifiedChunk !== void 0)
          chunk = modifiedChunk;
      }
      this.isFirstChunk = false;
      var aggregate = this._partialLine + chunk;
      this._partialLine = "";
      var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);
      if (this._handle.paused() || this._handle.aborted())
        return;
      var lastIndex = results.meta.cursor;
      if (!this._finished) {
        this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
        this._baseIndex = lastIndex;
      }
      if (results && results.data)
        this._rowCount += results.data.length;
      var finishedIncludingPreview = this._finished || this._config.preview && this._rowCount >= this._config.preview;
      if (isFunction(this._config.chunk) && !isFakeChunk) {
        this._config.chunk(results, this._handle);
        if (this._handle.paused() || this._handle.aborted())
          return;
        results = void 0;
        this._completeResults = void 0;
      }
      if (!this._config.step && !this._config.chunk) {
        this._completeResults.data = this._completeResults.data.concat(results.data);
        this._completeResults.errors = this._completeResults.errors.concat(results.errors);
        this._completeResults.meta = results.meta;
      }
      if (!this._completed && finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted)) {
        this._config.complete(this._completeResults, this._input);
        this._completed = true;
      }
      if (!finishedIncludingPreview && (!results || !results.meta.paused))
        this._nextChunk();
      return results;
    };
    this._sendError = function(error) {
      if (isFunction(this._config.error))
        this._config.error(error);
    };
    function replaceConfig(config2) {
      var configCopy = copy(config2);
      configCopy.chunkSize = parseInt(configCopy.chunkSize);
      if (!config2.step && !config2.chunk)
        configCopy.chunkSize = null;
      this._handle = new ParserHandle(configCopy);
      this._handle.streamer = this;
      this._config = configCopy;
    }
  }