function _fillStroge() {
        return new Promise((resolve, reject) => {
            browser.runtime.sendMessage({ from: "gm-apis", operate: "GM_listValues", uuid: _uuid }, (response) => {
                resolve(response.body);
            });
        });
    }