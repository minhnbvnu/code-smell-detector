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