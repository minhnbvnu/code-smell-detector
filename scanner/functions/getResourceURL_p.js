function getResourceURL_p(name) {
        return new Promise((resolve, reject) => {
            browser.runtime.sendMessage({ from: "gm-apis", operate: "GM_getResourceUrl", key: name, uuid: _uuid }, (response) => {

                // console.log("GM_getResourceURL_p-----",response);
                resolve(response.body);
            });
        });
    }