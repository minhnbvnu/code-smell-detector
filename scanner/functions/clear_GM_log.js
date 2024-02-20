function clear_GM_log() {
            window.postMessage({ id: _uuid, name: "API_CLEAR_LOG" });
        }