function setFloating(){
        var toobarBoxPos = domUtils.getXY(toolbarBox),
            origalFloat = domUtils.getComputedStyle(toolbarBox,'position'),
            origalLeft = domUtils.getComputedStyle(toolbarBox,'left');
        toolbarBox.style.width = toolbarBox.offsetWidth + 'px';
        toolbarBox.style.zIndex = me.options.zIndex * 1 + 1;
        toolbarBox.parentNode.insertBefore(placeHolder, toolbarBox);
        if (LteIE6 || (quirks && browser.ie)) {
            if(toolbarBox.style.position != 'absolute'){
                toolbarBox.style.position = 'absolute';
            }
            toolbarBox.style.top = (document.body.scrollTop||document.documentElement.scrollTop) - orgTop + topOffset  + 'px';
        } else {
            if (browser.ie7Compat && flag) {
                flag = false;
                toolbarBox.style.left =  domUtils.getXY(toolbarBox).x - document.documentElement.getBoundingClientRect().left+2  + 'px';
            }
            if(toolbarBox.style.position != 'fixed'){
                toolbarBox.style.position = 'fixed';
                toolbarBox.style.top = topOffset +"px";
                ((origalFloat == 'absolute' || origalFloat == 'relative') && parseFloat(origalLeft)) && (toolbarBox.style.left = toobarBoxPos.x + 'px');
            }
        }
    }