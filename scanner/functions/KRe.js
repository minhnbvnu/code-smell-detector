function KRe(e){if(e.hostname!==""){const n=new TypeError('File URL host must be "localhost" or empty on darwin');throw n.code="ERR_INVALID_FILE_URL_HOST",n}const t=e.pathname;let r=-1;for(;++r<t.length;)if(t.codePointAt(r)===37&&t.codePointAt(r+1)===50){const n=t.codePointAt(r+2);if(n===70||n===102){const i=new TypeError("File URL path must not include encoded / characters");throw i.code="ERR_INVALID_FILE_URL_PATH",i}}return decodeURIComponent(t)}