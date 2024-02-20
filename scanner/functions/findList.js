function findList(node,filterFn){
            while(node && !domUtils.isBody(node)){
                if(filterFn(node)){
                    return null
                }
                if(node.nodeType == 1 && /[ou]l/i.test(node.tagName)){
                    return node;
                }
                node = node.parentNode;
            }
            return null;
        }