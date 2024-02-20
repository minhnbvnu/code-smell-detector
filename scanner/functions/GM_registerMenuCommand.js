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