function GM_getResourceText(name) {
        let resourceText = typeof __resourceTextStroge !== undefined ? __resourceTextStroge[name] : "";
        // let resourceText;
        if (!resourceText || typeof resourceText === undefined) {
            // 通过name获取resource
            // resourceText = await GM_getResourceText_p(name);
            browser.runtime.sendMessage({ from: "gm-apis", operate: "GM_getResourceText", key: name, url: __resourceUrlStroge[name],  uuid: _uuid }, (response) => {
                console.log("GM_getResourceText send to background-----", response);
                __resourceTextStroge[name] = response.body;
                resourceText = response.body;
            });
        }
        return resourceText;
    }