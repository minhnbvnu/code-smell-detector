function jDataView(buffer, byteOffset, byteLength, littleEndian) {
        if (jDataView.is(buffer)) {
            var result = buffer.slice(byteOffset, byteOffset + byteLength);
            return result._littleEndian = defined(littleEndian, result._littleEndian), result;
        }
        if (!jDataView.is(this)) return new jDataView(buffer, byteOffset, byteLength, littleEndian);
        if (this.buffer = buffer = jDataView.wrapBuffer(buffer), this._isArrayBuffer = compatibility.ArrayBuffer && is(buffer, ArrayBuffer), 
        this._isPixelData = !1, this._isDataView = compatibility.DataView && this._isArrayBuffer, 
        this._isNodeBuffer = !0 && compatibility.NodeBuffer && is(buffer, Buffer), !this._isNodeBuffer && !this._isArrayBuffer && !is(buffer, Array)) throw new TypeError("jDataView buffer has an incompatible type");
        this._littleEndian = !!littleEndian;
        var bufferLength = "byteLength" in buffer ? buffer.byteLength : buffer.length;
        this.byteOffset = byteOffset = defined(byteOffset, 0), this.byteLength = byteLength = defined(byteLength, bufferLength - byteOffset), 
        this._offset = this._bitOffset = 0, this._isDataView ? this._view = new DataView(buffer, byteOffset, byteLength) : this._checkBounds(byteOffset, byteLength, bufferLength), 
        this._engineAction = this._isDataView ? this._dataViewAction : this._isNodeBuffer ? this._nodeBufferAction : this._isArrayBuffer ? this._arrayBufferAction : this._arrayAction;
    }