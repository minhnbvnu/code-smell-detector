constructor(config) {
    super();

    this._imageOps = !!config.imageOps;
    let threads;
    if (config.threads === 0) {
      threads = 0;
    } else if (this._imageOps) {
      threads = 1;
    } else {
      threads = config.threads || 1;
    }

    /**
     * @type {Array<Worker>}
     */
    const workers = new Array(threads);
    if (threads) {
      for (let i = 0; i < threads; ++i) {
        workers[i] = createWorker(config, this._onWorkerMessage.bind(this, i));
      }
    } else {
      workers[0] = createFauxWorker(
        config,
        this._onWorkerMessage.bind(this, 0),
      );
    }
    this._workers = workers;

    /**
     * @type {Array<Job>}
     * @private
     */
    this._queue = [];

    this._maxQueueLength = config.queue || Infinity;
    this._running = 0;

    /**
     * @type {Object<number, any>}
     * @private
     */
    this._dataLookup = {};

    /**
     * @type {Job}
     * @private
     */
    this._job = null;
  }