function getNBConvertURL({path:e,format:t,download:n}){const o=url_1.URLExt.encodeParts(e);const r=url_1.URLExt.join(getBaseUrl(),"nbconvert",t,o);if(n){return r+"?download=true"}return r}