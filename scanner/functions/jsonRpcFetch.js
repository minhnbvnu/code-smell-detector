function jsonRpcFetch(method, ...params) {
    return new Promise((resolve, fail) => {
        while (params.length > 0 && typeof params[params.length - 1] === 'undefined') params.pop();
        const jsonrpc = JSON.stringify({
            jsonrpc: '2.0',
            id: 42,
            method: method,
            params: params
        });
        const headers = {'Content-Length': jsonrpc.length};
        if (user && password) {
            headers['Authorization'] = `Basic ${btoa(`${user}:${password}`)}`;
        }
        const req = http.request({
            hostname: host,
            port: port,
            method: 'POST',
            headers: headers
        }, (res) => {
            if (res.statusCode === 401) {
                fail(new Error(`Request Failed: Authentication Required. Status Code: ${res.statusCode}`));
                res.resume();
                return;
            }
            if (res.statusCode !== 200) {
                fail(new Error(`Request Failed. ${res.statusMessage? `${res.statusMessage} - `
                    : ''}Status Code: ${res.statusCode}`));
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('error', fail);
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parse = JSON.parse(rawData);
                    if (parse.error) {
                        fail(parse.error.message);
                    } else {
                        resolve(parse.result);
                    }
                } catch (e) {
                    fail(e);
                }
            });
        });
        req.on('error', fail);
        req.write(jsonrpc);
        req.end();
    });
}