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