function modified_sorter(ascending) {
        var order = ascending ? 1 : 0;
        return (function(a, b) {
            return utils.datetime_sort_helper(a.last_modified, b.last_modified,
                                              order)
        });
    }