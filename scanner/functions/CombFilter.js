function CombFilter(buffersize) {
        this.buffer = new T.fn.SignalArray(buffersize|0);
        this.buffersize = this.buffer.length;
        this.bufidx = 0;
        this.feedback =  0;
        this.filterstore = 0;
        this.damp = 0;
    }