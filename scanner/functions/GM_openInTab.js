function GM_openInTab(url, options) {
            const pid = Math.random().toString(36).substring(1, 9);
            let tabId = null;
            var close = function () {
                if (tabId === null) {
                    // re-schedule, cause tabId is null
                    window.setTimeout(close, 500);
                } else if (tabId > 0) {
                    window.postMessage({ id: _uuid, pid: pid, name: "API_CLOSE_TAB", tabId: tabId });
                    // browser.runtime.sendMessage({ from: "gm-apis", operate: "closeTab", tabId: tabId, uuid: _uuid }, resp);
                    tabId = undefined;
                } else {
                    console.log("env: attempt to close already closed tab!");
                }
            };
            if (url && url.search(/^\/\//) == 0) {
                url = location.protocol + url;
            }
            window.postMessage({ id: _uuid, pid: pid, name: "API_OPEN_IN_TAB", url: url, options: options ? JSON.stringify(options):"{}" });
            const callback = e => {
                // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
                if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_OPEN_IN_TAB") return;
                tabId = e.data.tabId;
                window.removeEventListener("message", callback);
            };
            window.addEventListener("message", callback);
            return { close: close};
        }