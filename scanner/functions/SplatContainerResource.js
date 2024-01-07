constructor(device, splatData) {
        super();

        this.device = device;
        this.splatData = splatData.isCompressed ? splatData.decompress() : splatData;
    }