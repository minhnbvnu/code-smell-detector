function __router(locationurl){
        
        uriParts = fw.uri.getInstance(locationurl);
        
        //处理session change 
        isSessionChange = lastSession != uriParts.session;
        lastSession = uriParts.session;
        //处理controller change 
        isControllerChange = uriParts.controller != lastController;
        lastController = uriParts.controller;

        //处理arguments change 
        isParamsChange = lastParams != uriParts.contr_argu.join("/");
        lastParams =  uriParts.contr_argu.join("/");
        
        // 如果session序列化发生变化,或者controller变化，则将从url恢复到session中，但不需要触发commit
        if(isSessionChange || isControllerChange){
            fw.session.preResume(lastSession,lastController);
        }
        if (isParamsChange || isSessionChange){
            isforce = true;
        }
        
        if(isforce){
            // 进入目标controller.
            fw.init((function(contr, params){
                    return function(){
                        fw.controller.dispatch(contr, params,isforce);
                        isforce = false;
                    };
            })(lastController, uriParts.contr_argu));//objToUrl(uriParts.params)
        }
        
        // 还原标记为false
        isIgnore  = isControllerChange = isSessionChange = lastOneSession = isParamsChange = false;
    }