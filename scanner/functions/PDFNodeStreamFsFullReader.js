function PDFNodeStreamFsFullReader(t){var a;_classCallCheck(this,PDFNodeStreamFsFullReader);a=r.call(this,t);var o=decodeURIComponent(a._url.path);h.test(a._url.href)&&(o=o.replace(/^\//,""));l.lstat(o,(function(t,r){if(t){"ENOENT"===t.code&&(t=new i.MissingPDFException('Missing PDF "'.concat(o,'".')));a._storedError=t;a._headersCapability.reject(t)}else{a._contentLength=r.size;a._setReadableStream(l.createReadStream(o));a._headersCapability.resolve()}}));return a}