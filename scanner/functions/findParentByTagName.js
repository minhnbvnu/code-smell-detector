function findParentByTagName(target, tagNames) {
            var i, current = target;
            tagNames = utils.isArray(tagNames) ? tagNames:[tagNames];
            while(current){
                for(i = 0;i < tagNames.length; i++) {
                    if(current.tagName == tagNames[i].toUpperCase()) return current;
                }
                current = current.parentNode;
            }
            return null;
        }