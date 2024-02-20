function correctChangeValue( changeValue, relatedCell, cells ) {

        //为单元格的paading预留空间
        changeValue -= getTabcellSpace();

        if( changeValue < 0 ) {
            return 0;
        }

        changeValue -= getTableCellWidth( relatedCell );

        //确定方向
        var direction = changeValue < 0 ? 'left':'right';

        changeValue = Math.abs(changeValue);

        //只关心非最后一个单元格就可以
        utils.each( cells, function( cellGroup ){

            var curCell = cellGroup[direction];

            //为单元格保留最小空间
            if( curCell ) {
                changeValue = Math.min( changeValue, getTableCellWidth( curCell )-cellMinWidth );
            }


        } );


        //修正越界
        changeValue = changeValue < 0 ? 0 : changeValue;

        return direction === 'left' ? -changeValue : changeValue;

    }