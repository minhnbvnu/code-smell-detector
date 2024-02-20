function injectJavaScript(userscript, version) {
        let gmFunVals = [];
        let grants = userscript.grants;
        let resourceUrls = userscript.resourceUrls||{};
        let api = `${GM_listValues_Async}\n`;
        api += `${GM_getAllResourceText}\n`;
        api += 'let __listValuesStroge = await GM_listValues_Async();\n';
        api += 'let __resourceUrlStroge = ' + JSON.stringify(resourceUrls)+';\n';
        api += 'let __resourceTextStroge = await GM_getAllResourceText();\n';
        api += `console.log("__resourceTextStroge==",__resourceTextStroge);\n`;
        api += 'let __RMC_CONTEXT = {};\n';
        api += 'let GM_info =' + GM_info(userscript, version) + ';\n';
        api += `${GM_log}\n`;
        api += `${clear_GM_log}\nclear_GM_log();\n`;
        api += `${__xhr}\n`
        gmFunVals.push("info: GM_info");
        let gmFunName = [];
        grants.forEach(grant => {
            if (grant === "unsafeWindow" && !gmFunName.includes("unsafeWindow")) {
                api += `const unsafeWindow = window;\n`;
                gmFunName.push("unsafeWindow");
            } 
            else if (grant === "GM.listValues" && !gmFunName.includes("GM.listValues")) {
                gmFunVals.push("listValues: GM_listValues_Async");
                gmFunName.push("GM.listValues");
            } 
            else if (grant === "GM_listValues" && !gmFunName.includes("GM_listValues")){
                api += `function GM_listValues(){ return __listValuesStroge;}\n`;
                gmFunName.push("GM_listValues");
            }
            else if (grant === "GM.deleteValue" && !gmFunName.includes("GM_deleteValue_Async")) {
                api += `${GM_deleteValue_Async}\n`;
                gmFunVals.push("deleteValue: GM_deleteValue_Async");
                gmFunName.push("GM_deleteValue_Async");
            }
            else if (grant === "GM_deleteValue" && !gmFunName.includes("GM_deleteValue")){
                api += `${GM_deleteValue_sync}\nconst GM_deleteValue = GM_deleteValue_sync;\n`;
                gmFunName.push("GM_deleteValue");
            }
            else if (grant === "GM_addStyle" && !gmFunName.includes("GM_addStyle")) { //同步
                api += `${GM_addStyleSync}\nconst GM_addStyle = GM_addStyleSync;\n`;
                gmFunName.push("GM_addStyle");
            } 
            else if (grant === "GM.addStyle" && !gmFunName.includes("GM_addStyle_Async")) {
                api += `${GM_addStyle_Async}\n`;
                gmFunVals.push("addStyle: GM_addStyle_Async");
                gmFunName.push("GM_addStyle_Async");
            } 
            else if ("GM.setValue" === grant && !gmFunName.includes("GM_setValue_Async")){
                api += `${GM_setValue_Async}\n`;
                gmFunVals.push("setValue:  GM_setValue_Async");
                gmFunName.push("GM_setValue_Async");
            }
            else if ("GM_setValue" === grant && !gmFunName.includes("GM_setValue")) {
                api += `${GM_setValueSync}\nconst GM_setValue = GM_setValueSync;\n`;
                gmFunName.push("GM_setValue");
            }
            else if ("GM.getValue" === grant && !gmFunName.includes("GM_getValueAsync")) {
                api += `${GM_getValueAsync}\n`;
                gmFunVals.push("getValue: GM_getValueAsync");
                gmFunName.push("GM_getValueAsync");
            }
            else if ("GM_getValue" === grant && !gmFunName.includes("GM_getValueSync")) {
                api += `${GM_getValueSync}\nconst GM_getValue = GM_getValueSync;\n`;
                gmFunName.push("GM_getValueSync");
            }
            else if (("GM_registerMenuCommand" === grant || "GM.registerMenuCommand" === grant) && 
                (!gmFunName.includes("GM_registerMenuCommand") || !gmFunName.includes("GM.registerMenuCommand"))){
                api += `${GM_registerMenuCommand}\n`;
                gmFunVals.push("registerMenuCommand: GM_registerMenuCommand");
                gmFunName.push("GM_registerMenuCommand");
                gmFunName.push("GM.registerMenuCommand");
            }
            else if (("GM_unregisterMenuCommand" === grant || "GM.unregisterMenuCommand" === grant) && 
                (!gmFunName.includes("GM_unregisterMenuCommand") || !gmFunName.includes("GM.unregisterMenuCommand"))) {
                api += `${GM_unregisterMenuCommand}\n`;
                gmFunVals.push("unregisterMenuCommand: GM_unregisterMenuCommand");
                gmFunName.push("GM_unregisterMenuCommand");
                gmFunName.push("GM.unregisterMenuCommand");
            }
            else if (("GM_getResourceUrl" === grant || "GM_getResourceURL" === grant) && !gmFunName.includes("GM_getResourceURLSync")){
                api += `${GM_getResourceURLSync}\n`;
                gmFunName.push("GM_getResourceURLSync");
                api += `const GM_getResourceURL=GM_getResourceURLSync;\n`;
                api += `const GM_getResourceUrl=GM_getResourceURLSync;\n`;
            }
            else if (("GM.getResourceURL" === grant || "GM.getResourceUrl" === grant) && !gmFunName.includes("GM_getResourceURL_Async")){
                api += `${GM_getResourceURL_Async}\n`;
                gmFunVals.push("getResourceURL: GM_getResourceURL_Async");
                gmFunVals.push("getResourceUrl: GM_getResourceURL_Async");
                gmFunName.push("GM_getResourceURL_Async");

            }
            else if ("GM.getResourceText" === grant && !gmFunName.includes("GM.GM_getResourceText_Async")) {
                api += `${GM_getResourceText_Async}\n`;
                gmFunVals.push("getResourceText: GM_getResourceText_Async");
                gmFunName.push("GM_getResourceText_Async");
            }
            else if ("GM_getResourceText" === grant && !gmFunName.includes("GM_getResourceTextSync")) {
                api += `${GM_getResourceTextSync}\nconst GM_getResourceText = GM_getResourceTextSync;\n`;
                gmFunName.push("GM_getResourceTextSync");
            }
            else if ("GM.openInTab" === grant && !gmFunName.includes("GM_openInTab_async")) {
                api += `${GM_openInTab_async}\n`;
                
                gmFunVals.push("openInTab: GM_openInTab_async");
                gmFunName.push("GM_openInTab_async");
                if (!gmFunName.includes("GM_closeTab")){
                    api += `${GM_closeTab}\n`;
                    gmFunVals.push("closeTab: GM_closeTab");
                    gmFunName.push("GM_closeTab");
                }
            }
            else if ("GM_openInTab" === grant && !gmFunName.includes("GM_openInTab")) {
                api += `${GM_openInTab}\n`;
                gmFunName.push("GM_openInTab");
            }
            else if (("GM.closeTab" === grant || "GM_closeTab" === grant) && !gmFunName.includes("GM_closeTab")) {
                api += `${GM_closeTab}\n`;
                gmFunVals.push("closeTab: GM_closeTab");
                gmFunName.push("GM_closeTab");
            }
            else if (("GM.notification" === grant || "GM_notification" === grant) && !gmFunName.includes("GM_notification")) {
                api += `${GM_notification}\n`;
                gmFunVals.push("notification: GM_notification");
                gmFunName.push("GM_notification");
            }
            else if (("GM.setClipboard" === grant || "GM_setClipboard" === grant) && !gmFunName.includes("GM_setClipboard") ) {
                api += `${GM_setClipboard}\n`;
                gmFunVals.push("setClipboard: GM_setClipboard");
                gmFunName.push("GM_setClipboard");
            }
            else if (("GM.download" === grant || "GM_download" === grant) && !gmFunName.includes("GM_download")) {
                api += `${GM_download}\n`;
                gmFunVals.push("download: GM_download");
                gmFunName.push("GM_download");
            }
            else if (grant === "GM_xmlhttpRequest" && !gmFunName.includes("GM_xmlhttpRequest")){
                api += "\nconst GM_xmlhttpRequest = __xhr;\n";
                gmFunName.push("GM_xmlhttpRequest");

            }
            else if (grant === "GM.xmlHttpRequest" && !gmFunName.includes("GM.xmlHttpRequest")) {
                gmFunVals.push("xmlHttpRequest: __xhr");
                gmFunName.push("GM.xmlHttpRequest");
            }
        })

        function GM_info(userscript, version) {
            let info = {
                version: version,
                scriptHandler: "Stay",
                script: {
                    version: userscript.version,
                    description: userscript.description,
                    namespace: userscript.namespace,
                    resources: userscript.resourceUrls ? userscript.resourceUrls : [],
                    includes: userscript.includes ? userscript.includes : [],
                    excludes: userscript.excludes ? userscript.excludes : [],
                    matches: userscript.matches ? userscript.matches : []
                }
            };
            return JSON.stringify(info);
        }

        function GM_listValues_Async() {
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_LIST_VALUES") return;
                    resolve(e.data.response.body);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                window.postMessage({ id: _uuid, pid: pid, name: "API_LIST_VALUES" });
            });
        }
        

        function GM_setValueSync(key, value) {
            __listValuesStroge[key] = value;
            window.postMessage({ id: _uuid, name: "API_SET_VALUE_SYNC", key: key, value: value });
        }

        function GM_setValue_Async(key, value) {
            __listValuesStroge[key] = value;
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_SET_VALUE") return;
                    resolve(e.data.response);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                window.postMessage({ id: _uuid, pid: pid, name: "API_SET_VALUE", key: key, value: value });
            });
        }

        function GM_getValueSync(key, defaultValue) {
            const pid = Math.random().toString(36).substring(1, 9);
            window.postMessage({ id: _uuid, pid: pid, name: "API_GET_VALUE_SYNC", key: key, defaultValue: defaultValue });
            return __listValuesStroge[key] == null ? defaultValue : __listValuesStroge[key];
        }

        function GM_getValueAsync(key, defaultValue) {
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_GET_VALUE") return;
                    resolve(e.data.response);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                window.postMessage({ id: _uuid, pid: pid, name: "API_GET_VALUE", key: key, defaultValue: defaultValue });
            });
        }

        function GM_deleteValue_Async(key) {
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_DELETE_VALUE") return;
                    resolve(e.data.response);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
                window.postMessage({ id: _uuid, pid: pid, name: "API_DELETE_VALUE", key: key });
            });
        }

        function GM_deleteValue_sync(key) {
            const pid = Math.random().toString(36).substring(1, 9);
            const callback = e => {
                // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
                if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_DELETE_VALUE") return;
                window.removeEventListener("message", callback);
            };
            window.addEventListener("message", callback);
            // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
            window.postMessage({ id: _uuid, pid: pid, name: "API_DELETE_VALUE", key: key });
            return key;
        }

        function GM_getResourceURLSync(name) {
            let resourceUrl = typeof __resourceUrlStroge !== undefined ? __resourceUrlStroge[name] : "";
            if (!resourceText || resourceText === "" || resourceText === undefined) {
                window.postMessage({ id: _uuid, pid: pid, name: "API_GET_REXOURCE_URL_SYNC", key: name });
            }
            return resourceUrl;
        }

        function GM_getResourceURL_Async(name) {
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_GET_REXOURCE_URL") return;
                    resolve(e.data.response);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                window.postMessage({ id: _uuid, pid: pid, name: "API_GET_REXOURCE_URL", key: name });
            });
        }

        function GM_getResourceText_Async(name) {
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_GET_REXOURCE_TEXT") return;
                    resolve(e.data.response);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                window.postMessage({ id: _uuid, pid: pid, name: "API_GET_REXOURCE_TEXT", key: name, url: __resourceUrlStroge[name] });
            });
        }

        function GM_getResourceTextSync(name) {
            let resourceText = typeof __resourceTextStroge !== undefined ? __resourceTextStroge[name] : "";
            if (!resourceText || resourceText === "" || resourceText === undefined) {
                window.postMessage({ id: _uuid, pid: pid, name: "API_GET_REXOURCE_TEXT_SYNC", key: name, url: __resourceUrlStroge[name] });
            }
            return resourceText;
        }

        function GM_getAllResourceText() {
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_GET_ALL_REXOURCE_TEXT") return;
                    console.log("GM_getAllResourceText----", e);
                    resolve(e.data.response.body);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                window.postMessage({ id: _uuid, pid: pid, name: "API_GET_ALL_REXOURCE_TEXT" });
            });
        }

        function GM_addStyleSync(css) {
            window.postMessage({ id: _uuid, name: "API_ADD_STYLE_SYNC", css: css });
            return css;
        }

        function GM_addStyle_Async(css) {
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_ADD_STYLE") return;
                    resolve(e.data.response);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                window.postMessage({ id: _uuid, pid: pid, name: "API_ADD_STYLE", css: css });
            });
        }

        function clear_GM_log() {
            window.postMessage({ id: _uuid, name: "API_CLEAR_LOG" });
        }

        function GM_log(message) {
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_LOG") return;
                    resolve(e.data.response);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
                window.postMessage({ id: _uuid, pid: pid, name: "API_LOG", message: message });
            });
        }

        function GM_registerMenuCommand(caption, commandFunc, accessKey) {
            let userInfo = {};
            console.log("GM_registerMenuCommand----", caption, accessKey);
            const pid = Math.random().toString(36).substring(1, 9);
            userInfo["caption"] = caption;
            userInfo["accessKey"] = accessKey;
            userInfo["id"] = pid;
            userInfo["commandFunc"] = commandFunc;
            console.log("GM_registerMenuCommand----", userInfo);
            window.postMessage({ id: _uuid, pid: pid, name: "REGISTER_MENU_COMMAND_CONTEXT", rmc_context: JSON.stringify(userInfo) });
            let UUID_RMC_CONTEXT = __RMC_CONTEXT[_uuid]
            if (!UUID_RMC_CONTEXT || UUID_RMC_CONTEXT == "" || UUID_RMC_CONTEXT == "[]"){
                UUID_RMC_CONTEXT = [];
            }
            UUID_RMC_CONTEXT.push(userInfo);
            __RMC_CONTEXT[_uuid] = UUID_RMC_CONTEXT;
            // __RMC_CONTEXT.push(userInfo);
           
            window.addEventListener('message', (e) => {
                if (!e || !e.data || !e.data.name) return;
                let uuid = e.data.uuid;
                const name = e.data.name;
                if ("execRegisterMenuCommand" === name && uuid == _uuid){
                    let menuId = e.data.menuId;
                    let place = -1;
                    let __UUID_RMC_CONTEXT = __RMC_CONTEXT[uuid]
                    if (__UUID_RMC_CONTEXT && __UUID_RMC_CONTEXT.length > 0) {
                        __UUID_RMC_CONTEXT.forEach((item, index) => {
                            if (item.id == menuId) {
                                place = index;
                                return false;
                            }
                        });
                        if (place >= 0) {
                            __UUID_RMC_CONTEXT[place]["commandFunc"]();
                        }
                    }
                }
            
            });
            return pid;
        }

        function GM_unregisterMenuCommand(menuId) {
            let __UUID_RMC_CONTEXT = __RMC_CONTEXT[_uuid]
            if (!menuId || __UUID_RMC_CONTEXT.length<=0){
                return;
            }
            let place = -1;
            __UUID_RMC_CONTEXT.forEach((item, index)=>{
                if (item.id == menuId && item.uuid == _uuid){
                    place = index;
                    return false;
                }
            });
            if (place>=0){
                let pid = __UUID_RMC_CONTEXT[place].id
                __UUID_RMC_CONTEXT.splice(place, 1);
                __RMC_CONTEXT[_uuid] = __UUID_RMC_CONTEXT;
                window.postMessage({ id: _uuid, name: "UNREGISTER_MENU_COMMAND_CONTEXT", pid: pid });
            }
        }

        function browserAddListener() {
            window.postMessage({ id: _uuid, name: "BROWSER_ADD_LISTENER"});
        }

        function GM_closeTab(tabId) {
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_CLOSE_TAB") return;
                    resolve(e.data.response);
                    window.removeEventListener("message", callback);
                };
                window.addEventListener("message", callback);
                window.postMessage({ id: _uuid, pid: pid, name: "API_CLOSE_TAB", tabId: tabId });
            });
        }

        function GM_openInTab(url, options) {
            const pid = Math.random().toString(36).substring(1, 9);
            let tabId = null;
            var close = function () {
                if (tabId === null) {
                    // re-schedule, cause tabId is null
                    window.setTimeout(close, 500);
                } else if (tabId > 0) {
                    window.postMessage({ id: _uuid, pid: pid, name: "API_CLOSE_TAB", tabId: tabId });
                    // browser.runtime.sendMessage({ from: "gm-apis", operate: "closeTab", tabId: tabId, uuid: _uuid }, resp);
                    tabId = undefined;
                } else {
                    console.log("env: attempt to close already closed tab!");
                }
            };
            if (url && url.search(/^\/\//) == 0) {
                url = location.protocol + url;
            }
            window.postMessage({ id: _uuid, pid: pid, name: "API_OPEN_IN_TAB", url: url, options: options ? JSON.stringify(options):"{}" });
            const callback = e => {
                // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
                if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_OPEN_IN_TAB") return;
                tabId = e.data.tabId;
                window.removeEventListener("message", callback);
            };
            window.addEventListener("message", callback);
            return { close: close};
        } 

        /**
         * 打开标签页
         * @param {string} url 
         * @param {boolean} options 可以是 Boolean 类型，如果是 true，则当前 tab 不变；如果是 false，则当前 tab 变为新打开的 tab
         * options对象有以下属性:
         * active：新标签页获得焦点
         * insert：新标签页在当前页面之后添加
         * setParent：当新标签页关闭后，焦点给回当前页面
         * incognito: 新标签页在隐身模式或私有模式窗口打开
         * 若只有一个参数则新标签页不会聚焦，该函数返回一个对象，有close()、监听器onclosed和closed的标记
         */
        function GM_openInTab_async(url, options) {
            // console.log("start GM_openInTab-----", url, options);
            const pid = Math.random().toString(36).substring(1, 9);
            return new Promise(resolve => {
                const callback = e => {
                    // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
                    if (e.data.pid !== pid || e.data.id !== _uuid || e.data.name !== "RESP_OPEN_IN_TAB") return;
                    let tabId = e.data.tabId;
                    let resp = {
                        tabId,
                        close: function () {
                            GM_closeTab(tabId)
                        }
                    }
                    resolve(resp);
                    window.removeEventListener("message", ()=>{});
                };
                window.addEventListener("message", callback);
                // eslint-disable-next-line no-undef -- filename var accessible to the function at runtime
                window.postMessage({ id: _uuid, pid: pid, name: "API_OPEN_IN_TAB", url: url, options: options ? JSON.stringify(options) : "{}" });
            });

        }

        function __xhr(details) {
            // if details didn't include url, do nothing
            if (!details.url) return;
            // create unique id for the xhr
            const xhrId = Math.random().toString(36).substring(1, 9);
            // strip out functions from details, kind of hacky
            const detailsParsed = JSON.parse(JSON.stringify(details));
            // check which functions are included in the original details object
            // add a bool to indicate if event listeners should be attached
            if (details.onabort) detailsParsed.onabort = true;
            if (details.onerror) detailsParsed.onerror = true;
            if (details.onload) detailsParsed.onload = true;
            if (details.onloadend) detailsParsed.onloadend = true;
            if (details.onloadstart) detailsParsed.onloadstart = true;
            if (details.onprogress) detailsParsed.onprogress = true;
            if (details.onreadystatechange) detailsParsed.onreadystatechange = true;
            if (details.ontimeout) detailsParsed.ontimeout = true;
            // abort function gets returned when this function is called
            const abort = () => {
                window.postMessage({ id: _uuid, name: "API_XHR_ABORT_INJ_FROM_CREATE", xhrId: xhrId });
            };
            const callback = e => {
                const name = e.data.name;
                const response = e.data.response;
                // ensure callback is responding to the proper message
                if (
                    e.data.id !== _uuid
                    || e.data.xhrId !== xhrId
                    || !name
                    || !name.startsWith("RESP_API_XHR_TO_CREATE")
                ) return;
                console.log("XHR==response=", response);
                if (name === "RESP_API_XHR_TO_CREATE") {
                    console.log("RESP_API_XHR_TO_CREATE----");
                    // ignore
                } else if (name.includes("ABORT") && details.onabort) {
                    details.onabort(response);
                } else if (name.includes("ERROR") && details.onerror) {
                    details.onerror(response);
                } else if (name === "RESP_API_XHR_TO_CREATE_LOAD" && details.onload) {
                    details.onload(response);
                } else if (name.includes("LOADEND") && details.onloadend) {
                    details.onloadend(response);
                    // remove event listener when xhr is complete
                    window.removeEventListener("message", callback);
                } else if (name.includes("LOADSTART") && details.onloadstart) {
                    details.onloadtstart(response);
                } else if (name.includes("PROGRESS") && details.onprogress) {
                    details.onprogress(response);
                } else if (name.includes("READYSTATECHANGE") && details.onreadystatechange) {
                    details.onreadystatechange(response);
                } else if (name.includes("TIMEOUT") && details.ontimeout) {
                    details.ontimeout(response);
                }
            };
            window.addEventListener("message", callback);
            window.postMessage({ id: _uuid, name: "API_XHR_FROM_CREATE", details: JSON.stringify(detailsParsed), xhrId: xhrId });
            return { abort: abort };
        }

        api += `${browserAddListener}\nbrowserAddListener();`;

        const GM = `const GM = {${gmFunVals.join(",")}};`;
        return `\n${api}\n${GM}\n`;
    }