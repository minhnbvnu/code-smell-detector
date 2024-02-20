function checkIsCludeLink(node){
            if(node.nodeType == 3){
                return null
            }
            if(node.nodeName == 'A'){
                return node;
            }
            var lastChild = node.lastChild;

            while(lastChild){
                if(lastChild.nodeName == 'A'){
                    return lastChild;
                }
                if(lastChild.nodeType == 3){
                    if(domUtils.isWhitespace(lastChild)){
                        lastChild = lastChild.previousSibling;
                        continue;
                    }
                    return null
                }
                lastChild = lastChild.lastChild;
            }
        }