function update_threat_types(my_threat_types) {
        if (!threat_type_load) {
            var data = {
                        'threat_types': my_threat_types.toString(),
            };
            $.ajax({
                type: "POST",
                url: threat_type_modify,
                data: data,
                datatype: 'json',
            });
        }
    }