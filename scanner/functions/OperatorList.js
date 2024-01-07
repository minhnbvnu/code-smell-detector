function OperatorList(intent, streamSink) {
    this._streamSink = streamSink;
    this.fnArray = [];
    this.argsArray = [];

    if (streamSink && intent !== "oplist") {
      this.optimizer = new QueueOptimizer(this);
    } else {
      this.optimizer = new NullOptimizer(this);
    }

    this.dependencies = new Set();
    this._totalLength = 0;
    this.weight = 0;
    this._resolved = streamSink ? null : Promise.resolve();
  }