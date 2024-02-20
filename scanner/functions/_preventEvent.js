function _preventEvent(e){
    if (e.preventDefault) {
        e.preventDefault();
        e.stopPropagation();
    }else{
        e.returnValue = false;
    }
}