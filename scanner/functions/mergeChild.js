function mergeChild(rng,cmdName,value){
        if(needSetChild[cmdName]){
            rng.adjustmentBoundary();
            if(!rng.collapsed && rng.startContainer.nodeType == 1){
                var start = rng.startContainer.childNodes[rng.startOffset];
                if(start && domUtils.isTagNode(start,'span')){
                    var bk = rng.createBookmark();
                    utils.each(domUtils.getElementsByTagName(start, 'span'), function (span) {
                        if (!span.parentNode || domUtils.isBookmarkNode(span))return;
                        if(cmdName == 'backcolor' && domUtils.getComputedStyle(span,'background-color').toLowerCase() === value){
                            return;
                        }
                        domUtils.removeStyle(span,needSetChild[cmdName]);
                        if(span.style.cssText.replace(/^\s+$/,'').length == 0){
                            domUtils.remove(span,true)
                        }
                    });
                    rng.moveToBookmark(bk)
                }
            }
        }

    }