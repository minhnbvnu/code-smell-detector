function getCellsByMoveBorder( cell, table, isContainMergeCell ) {

        if( !table ) {
            table = domUtils.findParentByTagName( cell, 'table' );
        }

        if( !table ) {
            return null;
        }

        //获取到该单元格所在行的序列号
        var index = domUtils.getNodeIndex( cell ),
            temp = cell,
            rows = table.rows,
            colIndex = 0;

        while( temp ) {
            //获取到当前单元格在未发生单元格合并时的序列
            if( temp.nodeType === 1 ) {
                colIndex += (temp.colSpan || 1);
            }
            temp = temp.previousSibling;
        }

        temp = null;

        //记录想关的单元格
        var borderCells = [];

        utils.each(rows, function( tabRow ){

            var cells = tabRow.cells,
                currIndex = 0;

            utils.each( cells, function( tabCell ){

                currIndex += (tabCell.colSpan || 1);

                if( currIndex === colIndex ) {

                    borderCells.push({
                        left: tabCell,
                        right: tabCell.nextSibling || null
                    });

                    return false;

                } else if( currIndex > colIndex ) {

                    if( isContainMergeCell ) {
                        borderCells.push({
                            left: tabCell
                        });
                    }

                    return false;
                }


            } );

        });

        return borderCells;

    }