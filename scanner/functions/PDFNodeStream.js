function PDFNodeStream(t){_classCallCheck(this,PDFNodeStream);this.source=t;this.url=function parseUrl(t){var r=d.parse(t);if("file:"===r.protocol||r.host)return r;if(/^[a-z]:[/\\]/i.test(t))return d.parse("file:///".concat(t));r.host||(r.protocol="file:");return r}(t.url);this.isHttp="http:"===this.url.protocol||"https:"===this.url.protocol;this.isFsUrl="file:"===this.url.protocol;this.httpHeaders=this.isHttp&&t.httpHeaders||{};this._fullRequestReader=null;this._rangeRequestReaders=[]}