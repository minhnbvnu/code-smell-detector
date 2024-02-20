function GM_getValue(key, defaultValue) {
        browser.runtime.sendMessage({ from: "gm-apis", operate: "GM_getValue", key: key, defaultValue: defaultValue, uuid: _uuid });
        return __stroge[key] == null ? defaultValue : __stroge[key];
    }