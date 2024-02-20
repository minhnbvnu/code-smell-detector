function GM_deleteValue(key) {
        __stroge[key] = null;
        browser.runtime.sendMessage({ from: "gm-apis", operate: "GM_deleteValue", key: key, uuid: _uuid });
    }