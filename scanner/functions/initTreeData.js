function initTreeData( browseAPIURL, mountpoint) {
         $("#browse_jstree").jstree('destroy');
        
        $("#browse_jstree")
            .on('select_node.jstree', function (e, data) {
                var pathArray = getSelectedPaths();
                if ( pathArray.length > 0 ) {
                    if (pathArray.length > 1) {
                        $('#ingestPath').val( JSON.stringify(pathArray) );
                    } else {
                        // for single clips only show the eameadia path (not JSON syntax)
                        $('#ingestPath').val( pathArray[0] );
                    }
                }
                
            })
            .jstree( JSTreeAnywhereBrowser.setupDataLink( browseAPIURL, mountpoint) );
        
    }