function GM_setValue_Async(key, value) {
            __listValuesStroge[key] = value;
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_SET_VALUE") return;
                    resolve(e.data.response);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                window.postMessage({ id: _uuid, pid: pid, name: "API_SET_VALUE", key: key, value: value });
            });
        }