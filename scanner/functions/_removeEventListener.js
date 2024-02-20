function _removeEventListener(element, type,listener,useCapture){
    if(element.removeEventListener){
        element.removeEventListener(type, listener, useCapture);
    }else if (element.detachEvent){
        element.detachEvent(type, listener);
    }
}