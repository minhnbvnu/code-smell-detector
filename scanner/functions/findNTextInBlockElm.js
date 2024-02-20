function findNTextInBlockElm(node,index,str){
        var currentIndex = 0,
            currentNode = node.firstChild,
            currentNodeLength = 0,
            result;
        while(currentNode){
            if(currentNode.nodeType == 3){
                currentNodeLength = currentNode.nodeValue.replace(/(^[\t\r\n]+)|([\t\r\n]+$)/,'').length;
                currentIndex += currentNodeLength;
                if(currentIndex >= index){
                    return {
                        'node':currentNode,
                        'index': currentNodeLength - (currentIndex - index)
                    }
                }
            }else if(!dtd.$empty[currentNode.tagName]){
                currentNodeLength = currentNode[browser.ie ? 'innerText' : 'textContent'].replace(/(^[\t\r\n]+)|([\t\r\n]+$)/,'').length
                currentIndex += currentNodeLength;
                if(currentIndex >= index){
                    result = findNTextInBlockElm(currentNode,currentNodeLength - (currentIndex - index),str);
                    if(result){
                        return result;
                    }
                }
            }
            currentNode = domUtils.getNextDomNode(currentNode);

        }
    }