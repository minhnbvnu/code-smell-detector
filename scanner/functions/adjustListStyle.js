function adjustListStyle(doc,ignore){
        utils.each(domUtils.getElementsByTagName(doc,'ol ul'),function(node){

            if(!domUtils.inDoc(node,doc))
                return;

            var parent = node.parentNode;
            if(parent.tagName == node.tagName){
                var nodeStyleType = getStyle(node) || (node.tagName == 'OL' ? 'decimal' : 'disc'),
                    parentStyleType = getStyle(parent) || (parent.tagName == 'OL' ? 'decimal' : 'disc');
                if(nodeStyleType == parentStyleType){
                    var styleIndex = utils.indexOf(listStyle[node.tagName], nodeStyleType);
                    styleIndex = styleIndex + 1 == listStyle[node.tagName].length ? 0 : styleIndex + 1;
                    setListStyle(node,listStyle[node.tagName][styleIndex])
                }

            }
            var index = 0,type = 2;
            if( domUtils.hasClass(node,/custom_/)){
                if(!(/[ou]l/i.test(parent.tagName) && domUtils.hasClass(parent,/custom_/))){
                    type = 1;
                }
            }else{
                if(/[ou]l/i.test(parent.tagName) && domUtils.hasClass(parent,/custom_/)){
                    type = 3;
                }
            }

            var style = domUtils.getStyle(node, 'list-style-type');
            style && (node.style.cssText = 'list-style-type:' + style);
            node.className = utils.trim(node.className.replace(/list-paddingleft-\w+/,'')) + ' list-paddingleft-' + type;
            utils.each(domUtils.getElementsByTagName(node,'li'),function(li){
                li.style.cssText && (li.style.cssText = '');
                if(!li.firstChild){
                    domUtils.remove(li);
                    return;
                }
                if(li.parentNode !== node){
                    return;
                }
                index++;
                if(domUtils.hasClass(node,/custom_/) ){
                    var paddingLeft = 1,currentStyle = getStyle(node);
                    if(node.tagName == 'OL'){
                        if(currentStyle){
                            switch(currentStyle){
                                case 'cn' :
                                case 'cn1':
                                case 'cn2':
                                    if(index > 10 && (index % 10 == 0 || index > 10 && index < 20)){
                                        paddingLeft = 2
                                    }else if(index > 20){
                                        paddingLeft = 3
                                    }
                                    break;
                                case 'num2' :
                                    if(index > 9){
                                        paddingLeft = 2
                                    }
                            }
                        }
                        li.className = 'list-'+customStyle[currentStyle]+ index + ' ' + 'list-'+currentStyle+'-paddingleft-' + paddingLeft;
                    }else{
                        li.className = 'list-'+customStyle[currentStyle]  + ' ' + 'list-'+currentStyle+'-paddingleft';
                    }
                }else{
                    li.className = li.className.replace(/list-[\w\-]+/gi,'');
                }
                var className = li.getAttribute('class');
                if(className !== null && !className.replace(/\s/g,'')){
                    domUtils.removeAttributes(li,'class')
                }
            });
            !ignore && adjustList(node,node.tagName.toLowerCase(),getStyle(node)||domUtils.getStyle(node, 'list-style-type'),true);
        })
    }