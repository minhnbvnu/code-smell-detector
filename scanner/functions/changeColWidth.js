function changeColWidth(cell, changeValue) {

        var ut = getUETable(cell);
        if (ut) {

            //根据当前移动的边框获取相关的单元格
            var table = ut.table,
                cells = getCellsByMoveBorder( cell, table );

            table.style.width = "";
            table.removeAttribute("width");

            //修正改变量
            changeValue = correctChangeValue( changeValue, cell, cells );

            if (cell.nextSibling) {

                var i=0;

                utils.each( cells, function( cellGroup ){

                    cellGroup.left.width = (+cellGroup.left.width)+changeValue;
                    cellGroup.right && ( cellGroup.right.width = (+cellGroup.right.width)-changeValue );

                } );

            } else {

                utils.each( cells, function( cellGroup ){
                    cellGroup.left.width -= -changeValue;
                } );

            }
        }

    }