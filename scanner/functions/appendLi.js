function appendLi(list,p,type){
                    if(list.tagName == 'ol'){
                        if(browser.ie){
                            var first = p.firstChild();
                            if(first.type =='element' && first.tagName == 'span' && orderlisttype[type].test(first.innerText())){
                                p.removeChild(first);
                            }
                        }else{
                            p.innerHTML(p.innerHTML().replace(orderlisttype[type],''));
                        }
                    }else{
                        p.removeChild(p.firstChild())
                    }

                    var li = UE.uNode.createElement('li');
                    li.appendChild(p);
                    list.appendChild(li);
                }