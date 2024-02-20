function setAlign(align){
        align = align || 'none';
        var aligns = $G("alignIcon").children;
        for(i = 0; i < aligns.length; i++){
            if(aligns[i].getAttribute('data-align') == align) {
                domUtils.addClass(aligns[i], 'focus');
                $G("align").value = aligns[i].getAttribute('data-align');
            } else {
                domUtils.removeClasses(aligns[i], 'focus');
            }
        }
    }