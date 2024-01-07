constructor(device) {
        this.device = device;
        device.gpuProfiler.enabled = true;

        this.enabled = true;
        this.unitsName = 'ms';
        this.decimalPlaces = 1;

        this._timings = [];
    }