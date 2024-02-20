function getTableCellOffset( cell ) {

        tab = domUtils.findParentByTagName( cell, "table", false);

        if( tab.offsetVal === undefined ) {

            var prev = cell.previousSibling;

            if( prev ) {

                //最后一个单元格和前一个单元格的width diff结果 如果恰好为一个border width， 则条件成立
                tab.offsetVal = cell.offsetWidth - prev.offsetWidth === UT.borderWidth ? UT.borderWidth : 0;

            } else {
                tab.offsetVal = 0;
            }

        }

        return tab.offsetVal;

    }