function BaseRangeReader(t){_classCallCheck(this,BaseRangeReader);this._url=t.url;this._done=!1;this._storedError=null;this.onProgress=null;this._loaded=0;this._readableStream=null;this._readCapability=(0,i.createPromiseCapability)();var r=t.source;this._isStreamingSupported=!r.disableStream}