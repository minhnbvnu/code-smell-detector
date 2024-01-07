constructor(device) {
        super();
        this.device = device;
        this.ext = device.extDisjointTimerQuery;
    }