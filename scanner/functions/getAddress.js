function getAddress(isStart){
                var node = isStart ? me.startContainer : me.endContainer;
                var parents = domUtils.findParents(node,true,function(node){return !domUtils.isBody(node)}),
                    addrs = [];
                for(var i = 0,ci;ci = parents[i++];){
                    addrs.push(domUtils.getNodeIndex(ci,ignoreTxt));
                }
                var firstIndex = 0;

                if(ignoreTxt){
                    if(node.nodeType == 3){
                        var tmpNode = node.previousSibling;
                        while(tmpNode && tmpNode.nodeType == 3){
                            firstIndex += tmpNode.nodeValue.replace(fillCharReg,'').length;
                            tmpNode = tmpNode.previousSibling;
                        }
                        firstIndex +=  (isStart ? me.startOffset : me.endOffset)// - (fillCharReg.test(node.nodeValue) ? 1 : 0 )
                    }else{
                        node =  node.childNodes[ isStart ? me.startOffset : me.endOffset];
                        if(node){
                            firstIndex = domUtils.getNodeIndex(node,ignoreTxt);
                        }else{
                            node = isStart ? me.startContainer : me.endContainer;
                            var first = node.firstChild;
                            while(first){
                                if(domUtils.isFillChar(first)){
                                    first = first.nextSibling;
                                    continue;
                                }
                                firstIndex++;
                                if(first.nodeType == 3){
                                    while( first && first.nodeType == 3){
                                        first = first.nextSibling;
                                    }
                                }else{
                                    first = first.nextSibling;
                                }
                            }
                        }
                    }

                }else{
                    firstIndex = isStart ? domUtils.isFillChar(node) ? 0 : me.startOffset  : me.endOffset
                }
                if(firstIndex < 0){
                    firstIndex = 0;
                }
                addrs.push(firstIndex);
                return addrs;
            }