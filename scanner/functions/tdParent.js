function tdParent(node){
            while(node && node.type == 'element'){
                if(node.tagName == 'td'){
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        }