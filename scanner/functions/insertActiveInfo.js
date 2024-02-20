function insertActiveInfo(list, info) {
                for (var i = 0; i < list.length; ++i) {
                    if (list[i].id === info.id) {
                        list[i].location = info.location;
                        return;
                    }
                }
                list.push(info);
            }