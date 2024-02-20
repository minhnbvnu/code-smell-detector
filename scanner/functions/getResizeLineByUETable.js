function getResizeLineByUETable() {

        var lineId = '_UETableResizeLine',
            line = this.document.getElementById( lineId );

        if( !line ) {
            line = this.document.createElement("div");
            line.id = lineId;
            line.contnetEditable = false;
            line.setAttribute("unselectable", "on");

            var styles = {
                width: 2*cellBorderWidth + 1 + 'px',
                position: 'absolute',
                'z-index': 100000,
                cursor: 'col-resize',
                background: 'red',
                display: 'none'
            };

            //切换状态
            line.onmouseout = function(){
                this.style.display = 'none';
            };

            utils.extend( line.style, styles );

            this.document.body.appendChild( line );

        }

        return line;

    }