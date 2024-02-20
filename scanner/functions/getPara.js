function getPara(me){

        var opt = {},
            cont = me.getDom(),
            editorId = me.editor.uid,
            inputType = null,
            attrName = null,
            ipts = domUtils.getElementsByTagName(cont,"input");
        for(var i=ipts.length-1,ipt;ipt=ipts[i--];){
            inputType = ipt.getAttribute("type");
            if(inputType=="checkbox"){
                attrName = ipt.getAttribute("name");
                opt[attrName] && delete opt[attrName];
                if(ipt.checked){
                    var attrValue = document.getElementById( attrName + "Value" + editorId );
                    if(attrValue){
                        if(/input/ig.test(attrValue.tagName)){
                            opt[attrName] = attrValue.value;
                        } else {
                            var iptChilds = attrValue.getElementsByTagName("input");
                            for(var j=iptChilds.length-1,iptchild;iptchild=iptChilds[j--];){
                                if(iptchild.checked){
                                    opt[attrName] = iptchild.value;
                                    break;
                                }
                            }
                        }
                    } else {
                        opt[attrName] = true;
                    }
                } else {
                    opt[attrName] = false;
                }
            } else {
                opt[ipt.getAttribute("value")] = ipt.checked;
            }

        }

        var selects = domUtils.getElementsByTagName(cont,"select");
        for(var i=0,si;si=selects[i++];){
            var attr = si.getAttribute('name');
            opt[attr] = opt[attr] ? si.value : '';
        }

        utils.extend(me.editor.options.autotypeset,opt);

        me.editor.setPreferences('autotypeset', opt);
    }