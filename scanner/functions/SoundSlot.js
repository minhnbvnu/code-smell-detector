constructor(component, name = 'Untitled', options = {}) {
        super();

        this._component = component;
        this._assets = component.system.app.assets;
        this._manager = component.system.manager;

        this.name = name;

        this._volume = options.volume !== undefined ? math.clamp(Number(options.volume) || 0, 0, 1) : 1;
        this._pitch = options.pitch !== undefined ? Math.max(0.01, Number(options.pitch) || 0) : 1;
        this._loop = !!(options.loop !== undefined ? options.loop : false);
        this._duration = options.duration > 0 ? options.duration : null;
        this._startTime = Math.max(0, Number(options.startTime) || 0);
        this._overlap = !!(options.overlap);
        this._autoPlay = !!(options.autoPlay);
        this._firstNode = null;
        this._lastNode = null;

        this._asset = options.asset;
        if (this._asset instanceof Asset) {
            this._asset = this._asset.id;
        }

        this._onInstancePlayHandler = this._onInstancePlay.bind(this);
        this._onInstancePauseHandler = this._onInstancePause.bind(this);
        this._onInstanceResumeHandler = this._onInstanceResume.bind(this);
        this._onInstanceStopHandler = this._onInstanceStop.bind(this);
        this._onInstanceEndHandler = this._onInstanceEnd.bind(this);
    }