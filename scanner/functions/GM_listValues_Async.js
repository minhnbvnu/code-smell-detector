function GM_listValues_Async() {
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_LIST_VALUES") return;
                    resolve(e.data.response.body);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                window.postMessage({ id: _uuid, pid: pid, name: "API_LIST_VALUES" });
            });
        }