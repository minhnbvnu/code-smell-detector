function StringStreamer(config) {
    config = config || {};
    ChunkStreamer.call(this, config);
    var remaining;
    this.stream = function(s) {
      remaining = s;
      return this._nextChunk();
    };
    this._nextChunk = function() {
      if (this._finished)
        return;
      var size = this._config.chunkSize;
      var chunk = size ? remaining.substr(0, size) : remaining;
      remaining = size ? remaining.substr(size) : "";
      this._finished = !remaining;
      return this.parseChunk(chunk);
    };
  }