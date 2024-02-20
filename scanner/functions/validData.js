function validData ( table ) {

        var firstRows = null,
            cellCount = 0;

        //行数不够
        if ( table.rows.length < 2 ) {
            return false;
        }

        //列数不够
        if ( table.rows[0].cells.length < 2 ) {
            return false;
        }

        //第一行所有cell必须是th
        firstRows = table.rows[ 0 ].cells;
        cellCount = firstRows.length;

        for ( var i = 0, cell; cell = firstRows[ i ]; i++ ) {

            if ( cell.tagName.toLowerCase() !== 'th' ) {
                return false;
            }

        }

        for ( var i = 1, row; row = table.rows[ i ]; i++ ) {

            //每行单元格数不匹配， 返回false
            if ( row.cells.length != cellCount ) {
                return false;
            }

            //第一列不是th也返回false
            if ( row.cells[0].tagName.toLowerCase() !== 'th' ) {
                return false;
            }

            for ( var j = 1, cell; cell = row.cells[ j ]; j++ ) {

                var value = utils.trim( ( cell.innerText || cell.textContent || '' ) );

                value = value.replace( new RegExp( UE.dom.domUtils.fillChar, 'g' ), '' ).replace( /^\s+|\s+$/g, '' );

                //必须是数字
                if ( !/^\d*\.?\d+$/.test( value ) ) {
                    return false;
                }

            }

        }

        return true;

    }