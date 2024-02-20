function getSubcalls(row) {
        var id = row.attr('id');
        return $('.djDebugProfileRow[id^="'+id+'_"]');
    }