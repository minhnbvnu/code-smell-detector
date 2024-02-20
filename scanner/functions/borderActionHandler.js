function borderActionHandler( evt ) {

        if ( browser.ie ) {
            evt = reconstruct(evt );
        }

        clearTableDragTimer();

        //是否正在等待resize的缓冲中
        isInResizeBuffer = true;

        tableDragTimer = setTimeout(function(){
            tableBorderDrag( evt );
        }, dblclickTime);

    }