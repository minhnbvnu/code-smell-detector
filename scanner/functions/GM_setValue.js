function GM_setValue(key, value) {
        __stroge[key] = value;
        browser.runtime.sendMessage({ from: "gm-apis", operate: "GM_setValue", key: key, value: value, uuid: _uuid });
    }