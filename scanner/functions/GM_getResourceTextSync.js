function GM_getResourceTextSync(name) {
            let resourceText = typeof __resourceTextStroge !== undefined ? __resourceTextStroge[name] : "";
            if (!resourceText || resourceText === "" || resourceText === undefined) {
                window.postMessage({ id: _uuid, pid: pid, name: "API_GET_REXOURCE_TEXT_SYNC", key: name, url: __resourceUrlStroge[name] });
            }
            return resourceText;
        }