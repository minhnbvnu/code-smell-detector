function AsyncIteratorStreamer(config) {
    config = config || {};
    ChunkStreamer2.call(this, config);
    this.textDecoder = new TextDecoder(this._config.encoding);
    this.stream = async function(asyncIterator) {
      this._input = asyncIterator;
      try {
        for await (const chunk of asyncIterator) {
          this.parseChunk(this.getStringChunk(chunk));
        }
        this._finished = true;
        this.parseChunk("");
      } catch (error) {
        this._sendError(error);
      }
    };
    this._nextChunk = function nextChunk() {
    };
    this.getStringChunk = function(chunk) {
      return typeof chunk === "string" ? chunk : this.textDecoder.decode(chunk, { stream: true });
    };
  }