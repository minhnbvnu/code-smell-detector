function getValue_p(key, defaultValue) {
        return new Promise((resolve, reject) => {
            browser.runtime.sendMessage({ from: "gm-apis", operate: "GM_getValue", key: key, defaultValue: defaultValue, uuid: _uuid }, (response) => {
                resolve(response.body);
            });
        });
    }