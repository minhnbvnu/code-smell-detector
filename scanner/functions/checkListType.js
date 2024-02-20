function checkListType(content,container){
                var span = container.firstChild();
                if(span &&  span.type == 'element' && span.tagName == 'span' && /Wingdings|Symbol/.test(span.getStyle('font-family'))){
                    for(var p in unorderlisttype){
                        if(unorderlisttype[p] == span.data){
                            return p
                        }
                    }
                    return 'disc'
                }
                for(var p in orderlisttype){
                    if(orderlisttype[p].test(content)){
                        return p;
                    }
                }

            }