function getDirectSubcalls(row) {
        var subcalls = getSubcalls(row);
        var depth = parseInt(row.attr('depth'), 10) + 1;
        return subcalls.filter('[depth='+depth+']');
    }