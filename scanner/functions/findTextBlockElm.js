function findTextBlockElm(node,currentIndex,opt){
        var textContent,index,methodName = opt.all || opt.dir == 1 ? 'getNextDomNode' : 'getPreDomNode';
        if(domUtils.isBody(node)){
            node = node.firstChild;
        }
        var first = 1;
        while(node){
            textContent = node.nodeType == 3 ? node.nodeValue : node[browser.ie ? 'innerText' : 'textContent'];
            index = findTextInString(textContent,opt,currentIndex );
            first = 0;
            if(index!=-1){
                return {
                    'node':node,
                    'index':index
                }
            }
            node = domUtils[methodName](node);
            while(node && _blockElm[node.nodeName.toLowerCase()]){
                node = domUtils[methodName](node,true);
            }
            if(node){
                currentIndex = opt.dir == -1 ? (node.nodeType == 3 ? node.nodeValue : node[browser.ie ? 'innerText' : 'textContent']).length : 0;
            }

        }
    }