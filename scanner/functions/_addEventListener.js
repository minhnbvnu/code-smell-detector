function _addEventListener(element, type,listener,useCapture){
    if(element.addEventListener){
        element.addEventListener(type, listener, useCapture);
    }else if(element.attachEvent){
        element.attachEvent("on" + type, listener);
    }
}