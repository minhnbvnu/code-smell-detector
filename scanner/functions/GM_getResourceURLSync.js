function GM_getResourceURLSync(name) {
            let resourceUrl = typeof __resourceUrlStroge !== undefined ? __resourceUrlStroge[name] : "";
            if (!resourceText || resourceText === "" || resourceText === undefined) {
                window.postMessage({ id: _uuid, pid: pid, name: "API_GET_REXOURCE_URL_SYNC", key: name });
            }
            return resourceUrl;
        }