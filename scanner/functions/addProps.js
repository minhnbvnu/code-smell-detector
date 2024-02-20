function addProps(dict, set) {
                Object.keys(set).forEach(function (u) {
                    dict[stringStore.id(u)] = true;
                });
            }