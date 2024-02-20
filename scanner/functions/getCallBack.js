function getCallBack(onTimeOut){
            return function(){
                try {
                    if(onTimeOut){
                        options.onerror && options.onerror();
                    }else{
                        try{
                            clearTimeout(timer);
                            successhandler.apply(window, arguments);
                        } catch (e){}
                    }
                } catch (exception) {
                    options.onerror && options.onerror.call(window, exception);
                } finally {
                    options.oncomplete && options.oncomplete.apply(window, arguments);
                    scr.parentNode && scr.parentNode.removeChild(scr);
                    window[callbackFnName] = null;
                    try {
                        delete window[callbackFnName];
                    }catch(e){}
                }
            }
        }