function getBase(n){if(n.src&&/tiny_mce(|_dev|_src|_gzip|_jquery|_prototype).js/.test(n.src)){if(/_(src|dev)\.js/g.test(n.src))t.suffix='_src';if((p=n.src.indexOf('?'))!=-1)t.query=n.src.substring(p+1);t.baseURL=n.src.substring(0,n.src.lastIndexOf('/'));if(base&&t.baseURL.indexOf('://')==-1)t.baseURL=base+t.baseURL;return t.baseURL;}return null;}