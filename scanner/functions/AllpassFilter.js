function AllpassFilter(buffersize) {
        this.buffer = new T.fn.SignalArray(buffersize|0);
        this.buffersize = this.buffer.length;
        this.bufidx = 0;
    }