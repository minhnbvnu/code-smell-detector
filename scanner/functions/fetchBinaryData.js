function fetchBinaryData(url) {
    var nonBinaryRequest = PDFJS.disableWorker;
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    if (!nonBinaryRequest) {
      try {
        request.responseType = 'arraybuffer';
        nonBinaryRequest = request.responseType !== 'arraybuffer';
      } catch (e) {
        nonBinaryRequest = true;
      }
    }
    if (nonBinaryRequest && request.overrideMimeType) {
      request.overrideMimeType('text/plain; charset=x-user-defined');
    }
    request.send(null);
    if (nonBinaryRequest ? !request.responseText : !request.response) {
      error('Unable to get binary cMap at: ' + url);
    }
    if (nonBinaryRequest) {
      var data = Array.prototype.map.call(request.responseText, function (ch) {
        return ch.charCodeAt(0) & 255;
      });
      return new Uint8Array(data);
    }
    return new Uint8Array(request.response);
  }