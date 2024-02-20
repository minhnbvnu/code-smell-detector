function isCdataDiv(node){
                return  node.tagName == 'DIV' && node.getAttribute('cdata_tag');
            }