constructor(device) {
        super();
        this.device = device;

        // gpu timing queries
        this.timestampQueriesSet = device.supportsTimestampQuery ? new WebgpuQuerySet(device, true, 512) : null;
    }