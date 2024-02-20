function name_sorter(ascending) {
        return (function(a, b) {
            if (type_order[a['type']] < type_order[b['type']]) {
                return -1;
            }
            if (type_order[a['type']] > type_order[b['type']]) {
                return 1;
            }
            if (a['name'].toLowerCase() < b['name'].toLowerCase()) {
                return (ascending) ? -1 : 1;
            }
            if (a['name'].toLowerCase() > b['name'].toLowerCase()) {
                return (ascending) ? 1 : -1;
            }
            return 0;
        });
    }