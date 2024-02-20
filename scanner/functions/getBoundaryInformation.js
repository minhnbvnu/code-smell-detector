function getBoundaryInformation( range, start ) {
        var getIndex = domUtils.getNodeIndex;
        range = range.duplicate();
        range.collapse( start );
        var parent = range.parentElement();
        //如果节点里没有子节点，直接退出
        if ( !parent.hasChildNodes() ) {
            return  {container:parent, offset:0};
        }
        var siblings = parent.children,
            child,
            testRange = range.duplicate(),
            startIndex = 0, endIndex = siblings.length - 1, index = -1,
            distance;
        while ( startIndex <= endIndex ) {
            index = Math.floor( (startIndex + endIndex) / 2 );
            child = siblings[index];
            testRange.moveToElementText( child );
            var position = testRange.compareEndPoints( 'StartToStart', range );
            if ( position > 0 ) {
                endIndex = index - 1;
            } else if ( position < 0 ) {
                startIndex = index + 1;
            } else {
                //trace:1043
                return  {container:parent, offset:getIndex( child )};
            }
        }
        if ( index == -1 ) {
            testRange.moveToElementText( parent );
            testRange.setEndPoint( 'StartToStart', range );
            distance = testRange.text.replace( /(\r\n|\r)/g, '\n' ).length;
            siblings = parent.childNodes;
            if ( !distance ) {
                child = siblings[siblings.length - 1];
                return  {container:child, offset:child.nodeValue.length};
            }

            var i = siblings.length;
            while ( distance > 0 ){
                distance -= siblings[ --i ].nodeValue.length;
            }
            return {container:siblings[i], offset:-distance};
        }
        testRange.collapse( position > 0 );
        testRange.setEndPoint( position > 0 ? 'StartToStart' : 'EndToStart', range );
        distance = testRange.text.replace( /(\r\n|\r)/g, '\n' ).length;
        if ( !distance ) {
            return  dtd.$empty[child.tagName] || dtd.$nonChild[child.tagName] ?
            {container:parent, offset:getIndex( child ) + (position > 0 ? 0 : 1)} :
            {container:child, offset:position > 0 ? 0 : child.childNodes.length}
        }
        while ( distance > 0 ) {
            try {
                var pre = child;
                child = child[position > 0 ? 'previousSibling' : 'nextSibling'];
                distance -= child.nodeValue.length;
            } catch ( e ) {
                return {container:parent, offset:getIndex( pre )};
            }
        }
        return  {container:child, offset:position > 0 ? -distance : child.nodeValue.length + distance}
    }