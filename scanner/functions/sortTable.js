function sortTable(table, sortByCellIndex, compareFn) {
            var rows = table.rows,
                trArray = [],
                flag = rows[0].cells[0].tagName === "TH",
                lastRowIndex = 0;

            for (var i = 0,len = rows.length; i < len; i++) {
                trArray[i] = rows[i];
            }

            var Fn = {
                'reversecurrent': function(td1,td2){
                    return 1;
                },
                'orderbyasc': function(td1,td2){
                    var value1 = td1.innerText||td1.textContent,
                        value2 = td2.innerText||td2.textContent;
                    return value1.localeCompare(value2);
                },
                'reversebyasc': function(td1,td2){
                    var value1 = td1.innerHTML,
                        value2 = td2.innerHTML;
                    return value2.localeCompare(value1);
                },
                'orderbynum': function(td1,td2){
                    var value1 = td1[utils.isIE ? 'innerText':'textContent'].match(/\d+/),
                        value2 = td2[utils.isIE ? 'innerText':'textContent'].match(/\d+/);
                    if(value1) value1 = +value1[0];
                    if(value2) value2 = +value2[0];
                    return (value1||0) - (value2||0);
                },
                'reversebynum': function(td1,td2){
                    var value1 = td1[utils.isIE ? 'innerText':'textContent'].match(/\d+/),
                        value2 = td2[utils.isIE ? 'innerText':'textContent'].match(/\d+/);
                    if(value1) value1 = +value1[0];
                    if(value2) value2 = +value2[0];
                    return (value2||0) - (value1||0);
                }
            };

            //对表格设置排序的标记data-sort-type
            table.setAttribute('data-sort-type', compareFn && typeof compareFn === "string" && Fn[compareFn] ? compareFn:'');

            //th不参与排序
            flag && trArray.splice(0, 1);
            trArray = sort(trArray,function (tr1, tr2) {
                var result;
                if (compareFn && typeof compareFn === "function") {
                    result = compareFn.call(this, tr1.cells[sortByCellIndex], tr2.cells[sortByCellIndex]);
                } else if (compareFn && typeof compareFn === "number") {
                    result = 1;
                } else if (compareFn && typeof compareFn === "string" && Fn[compareFn]) {
                    result = Fn[compareFn].call(this, tr1.cells[sortByCellIndex], tr2.cells[sortByCellIndex]);
                } else {
                    result = Fn['orderbyasc'].call(this, tr1.cells[sortByCellIndex], tr2.cells[sortByCellIndex]);
                }
                return result;
            });
            var fragment = table.ownerDocument.createDocumentFragment();
            for (var j = 0, len = trArray.length; j < len; j++) {
                fragment.appendChild(trArray[j]);
            }
            var tbody = table.getElementsByTagName("tbody")[0];
            if(!lastRowIndex){
                tbody.appendChild(fragment);
            }else{
                tbody.insertBefore(fragment,rows[lastRowIndex- range.endRowIndex + range.beginRowIndex - 1])
            }
        }