function updateResizeLine( cell, uetable ) {

        var line = getResizeLineByUETable.call( this ),
            table = uetable.table,
            styles = {
                top: domUtils.getXY( table ).y + 'px',
                left: domUtils.getXY( cell).x + cell.offsetWidth - cellBorderWidth + 'px',
                display: 'block',
                height: table.offsetHeight + 'px'
            };

        utils.extend( line.style, styles );

    }