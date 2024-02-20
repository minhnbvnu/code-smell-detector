function tableDbclickHandler(evt) {
        singleClickState = 0;
        evt = evt || me.window.event;
        var target = getParentTdOrTh(evt.target || evt.srcElement);
        if (target) {
            var h;
            if (h = getRelation(target, mouseCoords(evt))) {

                hideDragLine( me );

                if (h == 'h1') {
                    h = 'h';
                    if (inTableSide(domUtils.findParentByTagName(target, "table"), target, evt)) {
                        me.execCommand('adaptbywindow');
                    } else {
                        target = getUETable(target).getPreviewCell(target);
                        if (target) {
                            var rng = me.selection.getRange();
                            rng.selectNodeContents(target).setCursor(true, true)
                        }
                    }
                }
                if (h == 'h') {
                    var ut = getUETable(target),
                        table = ut.table,
                        cells = getCellsByMoveBorder( target, table, true );

                    cells = extractArray( cells, 'left' );

                    ut.width = ut.offsetWidth;

                    var oldWidth = [],
                        newWidth = [];

                    utils.each( cells, function( cell ){

                        oldWidth.push( cell.offsetWidth );

                    } );

                    utils.each( cells, function( cell ){

                        cell.removeAttribute("width");

                    } );

                    window.setTimeout( function(){

                        //是否允许改变
                        var changeable = true;

                        utils.each( cells, function( cell, index ){

                            var width = cell.offsetWidth;

                            if( width > oldWidth[index] ) {
                                changeable = false;
                                return false;
                            }

                            newWidth.push( width );

                        } );

                        var change = changeable ? newWidth : oldWidth;

                        utils.each( cells, function( cell, index ){

                            cell.width = change[index] - getTabcellSpace();

                        } );


                    }, 0 );

//                    minWidth -= cellMinWidth;
//
//                    table.removeAttribute("width");
//                    utils.each(cells, function (cell) {
//                        cell.style.width = "";
//                        cell.width -= minWidth;
//                    });

                }
            }
        }
    }