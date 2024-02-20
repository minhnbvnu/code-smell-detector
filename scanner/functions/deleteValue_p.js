function deleteValue_p(key) {
        return new Promise((resolve, reject) => {
            browser.runtime.sendMessage({ from: "gm-apis", operate: "GM_deleteValue", key: key, uuid: _uuid }, (response) => {
                resolve(response.body);
            });
        });
    }