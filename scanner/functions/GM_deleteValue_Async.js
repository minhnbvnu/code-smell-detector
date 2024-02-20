function GM_deleteValue_Async(key) {
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_DELETE_VALUE") return;
                    resolve(e.data.response);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
                window.postMessage({ id: _uuid, pid: pid, name: "API_DELETE_VALUE", key: key });
            });
        }