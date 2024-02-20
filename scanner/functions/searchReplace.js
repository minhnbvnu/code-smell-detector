function searchReplace(me,opt){

        var rng = me.selection.getRange(),
            startBlockNode,
            searchStr = opt.searchStr,
            span = me.document.createElement('span');
        span.innerHTML = '$$ueditor_searchreplace_key$$';

        rng.shrinkBoundary(true);

        //判断是不是第一次选中
        if(!rng.collapsed){
            rng.select();
            var rngText = me.selection.getText();
            if(new RegExp('^' + opt.searchStr + '$',(opt.casesensitive ? '' : 'i')).test(rngText)){
                if(opt.replaceStr != undefined){
                    replaceText(rng,opt.replaceStr);
                    rng.select();
                    return true;
                }else{
                    rng.collapse(opt.dir == -1)
                }

            }
        }


        rng.insertNode(span);
        rng.enlargeToBlockElm(true);
        startBlockNode = rng.startContainer;
        var currentIndex = startBlockNode[browser.ie ? 'innerText' : 'textContent'].indexOf('$$ueditor_searchreplace_key$$');
        rng.setStartBefore(span);
        domUtils.remove(span);
        var result = findTextBlockElm(startBlockNode,currentIndex,opt);
        if(result){
            var rngStart = findNTextInBlockElm(result.node,result.index,searchStr);
            var rngEnd = findNTextInBlockElm(result.node,result.index + searchStr.length,searchStr);
            rng.setStart(rngStart.node,rngStart.index).setEnd(rngEnd.node,rngEnd.index);

            if(opt.replaceStr !== undefined){
                replaceText(rng,opt.replaceStr)
            }
            rng.select();
            return true;
        }else{
            rng.setCursor()
        }

    }