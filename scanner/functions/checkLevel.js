function checkLevel(li){
            if(me.options.maxListLevel != -1){
                var level = li.parentNode,levelNum = 0;
                while(/[ou]l/i.test(level.tagName)){
                    levelNum++;
                    level = level.parentNode;
                }
                if(levelNum >= me.options.maxListLevel){
                    return true;
                }
            }
        }