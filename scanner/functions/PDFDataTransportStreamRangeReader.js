function PDFDataTransportStreamRangeReader(t,r,a){_classCallCheck(this,PDFDataTransportStreamRangeReader);this._stream=t;this._begin=r;this._end=a;this._queuedChunk=null;this._requests=[];this._done=!1;this.onProgress=null}