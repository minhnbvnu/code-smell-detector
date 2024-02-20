function selectDone (checkStatus){
                if(opt.checkedKey){
                    var selected = [];
                    for(var i=0;i<checkStatus.data.length;i++){
                        selected.push(checkStatus.data[i][opt.checkedKey])
                    }
                    elem.attr("ts-selected",selected.join(","));
                }
                opt.done(elem, checkStatus);
                tableBox.remove();
                delete table.cache[tableName];
                checkedData = [];
            }