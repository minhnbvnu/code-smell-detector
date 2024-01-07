constructor(manager) {
        super();

        this.manager = manager;
        this.velocitiesSupported = !!(platform.browser && window.XRPose?.prototype?.hasOwnProperty('linearVelocity'));

        this._onInputSourcesChangeEvt = (evt) => {
            this._onInputSourcesChange(evt);
        };

        this.manager.on('start', this._onSessionStart, this);
        this.manager.on('end', this._onSessionEnd, this);
    }