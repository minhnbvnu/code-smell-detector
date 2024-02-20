function getTargetTd(editor, evt) {

        var target = domUtils.findParentByTagName(evt.target || evt.srcElement, ["td", "th"], true),
            dir = null;

        if( !target ) {
            return null;
        }

        dir = getRelation( target, mouseCoords( evt ) );

        //如果有前一个节点， 需要做一个修正， 否则可能会得到一个错误的td

        if( !target ) {
            return null;
        }

        if( dir === 'h1' && target.previousSibling ) {

            var position = domUtils.getXY( target),
                cellWidth = target.offsetWidth;

            if( Math.abs( position.x + cellWidth - evt.clientX ) > cellWidth / 3 ) {
                target = target.previousSibling;
            }

        } else if( dir === 'v1' && target.parentNode.previousSibling ) {

            var position = domUtils.getXY( target),
                cellHeight = target.offsetHeight;

            if( Math.abs( position.y + cellHeight - evt.clientY ) > cellHeight / 3 ) {
                target = target.parentNode.previousSibling.firstChild;
            }

        }


        //排除了非td内部以及用于代码高亮部分的td
        return target && !(editor.fireEvent("excludetable", target) === true) ? target : null;
    }