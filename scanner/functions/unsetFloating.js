function unsetFloating(){
        flag = true;
        if(placeHolder.parentNode){
            placeHolder.parentNode.removeChild(placeHolder);
        }

        toolbarBox.style.cssText = bakCssText;
    }