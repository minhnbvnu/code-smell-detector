function getSelectedPaths() {
        var pathArray = [];
        var nodeArray = $('#browse_jstree').jstree('get_selected',true);
        for (var i = 0; i < nodeArray.length; i++) {     
            if (nodeArray[i].original.type !== "DIRECTORY" && 
                nodeArray[i].original.url && 
                nodeArray[i].original.url.length !== 0) {
                pathArray.push( nodeArray[i].original.url );
            } 
        }
        return pathArray;
    }