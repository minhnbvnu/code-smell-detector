function add_to_predefined(group) {
        Object.keys(group).forEach(function (name) {
            predefined[name] = group[name];
        });
    }