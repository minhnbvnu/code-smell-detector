function getPdf(arg, callback) {
  var params = arg;
  if (typeof arg === 'string')
    params = { url: arg };

  var xhr = new PdfJS_window.XMLHttpRequest();
  xhr.open('GET', params.url);
  xhr.mozResponseType = xhr.responseType = 'arraybuffer';
  var protocol = params.url.indexOf(':') < 0 ? PdfJS_window.window.location.protocol :
    params.url.substring(0, params.url.indexOf(':') + 1);
  xhr.expected = (protocol === 'http:' || protocol === 'https:') ? 200 : 0;

  if ('progress' in params)
    xhr.onprogress = params.progress || undefined;

  if ('error' in params)
    xhr.onerror = params.error || undefined;

  xhr.onreadystatechange = function getPdfOnreadystatechange(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === xhr.expected) {
        var data = (xhr.mozResponseArrayBuffer || xhr.mozResponse ||
                    xhr.responseArrayBuffer || xhr.response);
        callback(data);
      } else if (params.error) {
        params.error(e);
      }
    }
  };
  xhr.send(null);
}