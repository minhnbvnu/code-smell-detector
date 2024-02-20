function tableBorderDrag( evt ) {

        isInResizeBuffer = false;

        startTd = evt.target || evt.srcElement;
        if( !startTd ) return;
        var state = getRelation(startTd, mouseCoords(evt));
        if (/\d/.test(state)) {
            state = state.replace(/\d/, '');
            startTd = getUETable(startTd).getPreviewCell(startTd, state == 'v');
        }
        hideDragLine(me);
        getDragLine(me, me.document);
        me.fireEvent('saveScene');
        showDragLineAt(state, startTd);
        mousedown = true;
        //拖动开始
        onDrag = state;
        dragTd = startTd;
    }