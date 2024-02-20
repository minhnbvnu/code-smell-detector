function getTableCellWidth( cell ) {

        var width = 0,
            //偏移纠正量
            offset = 0,
            width = cell.offsetWidth - getTabcellSpace();

        //最后一个节点纠正一下
        if( !cell.nextSibling ) {

            width -= getTableCellOffset( cell );

        }

        width = width < 0 ? 0 : width;

        try {
            cell.width = width;
        } catch(e) {
        }

        return width;

    }