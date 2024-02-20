function GM_getValueAsync(key, defaultValue) {
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_GET_VALUE") return;
                    resolve(e.data.response);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                window.postMessage({ id: _uuid, pid: pid, name: "API_GET_VALUE", key: key, defaultValue: defaultValue });
            });
        }