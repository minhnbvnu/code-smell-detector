function UntarInternal(arrayBuffer) {
        this._arrayBuffer = arrayBuffer || new ArrayBuffer(0);
        this._bufferView = new DataView(this._arrayBuffer);
        this._globalPaxHeader = null;
        this._paxHeader = null;
        this._bytesRead = 0;
    }