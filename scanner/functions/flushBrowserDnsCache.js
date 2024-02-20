function flushBrowserDnsCache(hostname) {
    let worker = new Worker('flushdnscache.js');
    let params = {};
    params.hostname = hostname;
    params.port = document.location.port;
    params.iterations = 1000;
    worker.postMessage(params);
}