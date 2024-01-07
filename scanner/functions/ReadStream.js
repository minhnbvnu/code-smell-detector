constructor(arraybuffer) {
        this.arraybuffer = arraybuffer;
        this.dataView = new DataView(arraybuffer);
        this.offset = 0;
        this.stack = [];
    }