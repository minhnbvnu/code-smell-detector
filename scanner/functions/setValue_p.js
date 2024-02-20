function setValue_p(key, value) {
        return new Promise((resolve, reject) => {
            browser.runtime.sendMessage({ from: "gm-apis", operate: "GM_setValue", key: key, value: value, uuid: _uuid }, (response) => {
                resolve(response.body);
            });
        });
    }