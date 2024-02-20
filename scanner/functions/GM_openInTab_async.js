function GM_openInTab_async(url, options) {
            // console.log("start GM_openInTab-----", url, options);
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_OPEN_IN_TAB") return;
                    let tabId = e.data.tabId;
                    let resp = {
                        tabId,
                        close: function () {
                            GM_closeTab(tabId)
                        }
                    }
                    resolve(resp);
                    window.removeEventListener("message", ()=>{});
                };
                window.addEventListener("message", callback);
                // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
                window.postMessage({ id: _uuid, pid: pid, name: "API_OPEN_IN_TAB", url: url, options: options ? JSON.stringify(options) : "{}" });
            });

        }