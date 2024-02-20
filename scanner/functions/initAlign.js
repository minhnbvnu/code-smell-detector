function initAlign(){
        /* 点击align图标 */
        domUtils.on($G("alignIcon"), 'click', function(e){
            var target = e.target || e.srcElement;
            if(target.className && target.className.indexOf('-align') != -1) {
                setAlign(target.getAttribute('data-align'));
            }
        });
    }