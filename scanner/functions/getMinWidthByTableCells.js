function getMinWidthByTableCells( cells ) {

        var minWidth = Number.MAX_VALUE;

        for( var i = 0, curCell; curCell = cells[ i ] ; i++ ) {

            minWidth = Math.min( minWidth, curCell.width || getTableCellWidth( curCell ) );

        }

        return minWidth;

    }