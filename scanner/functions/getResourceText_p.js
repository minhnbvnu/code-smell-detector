function getResourceText_p(name) {
        return new Promise((resolve, reject) => {
            browser.runtime.sendMessage({ from: "gm-apis", operate: "GM_getResourceText", key: name, url: __resourceUrlStroge[name], uuid: _uuid }, (response) => {
                console.log("GM_getResourceText_p-----", response);
                resolve(response.body);
            });
        });
    }