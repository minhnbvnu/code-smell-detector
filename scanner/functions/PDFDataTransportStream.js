function PDFDataTransportStream(t,r){var a=this;_classCallCheck(this,PDFDataTransportStream);(0,i.assert)(r,'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.');this._queuedChunks=[];this._progressiveDone=t.progressiveDone||!1;this._contentDispositionFilename=t.contentDispositionFilename||null;var o=t.initialData;if((null==o?void 0:o.length)>0){var l=new Uint8Array(o).buffer;this._queuedChunks.push(l)}this._pdfDataRangeTransport=r;this._isStreamingSupported=!t.disableStream;this._isRangeSupported=!t.disableRange;this._contentLength=t.length;this._fullRequestReader=null;this._rangeReaders=[];this._pdfDataRangeTransport.addRangeListener((function(t,r){a._onReceiveData({begin:t,chunk:r})}));this._pdfDataRangeTransport.addProgressListener((function(t,r){a._onProgress({loaded:t,total:r})}));this._pdfDataRangeTransport.addProgressiveReadListener((function(t){a._onReceiveData({chunk:t})}));this._pdfDataRangeTransport.addProgressiveDoneListener((function(){a._onProgressiveDone()}));this._pdfDataRangeTransport.transportReady()}