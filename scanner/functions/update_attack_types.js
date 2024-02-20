function update_attack_types(my_attack_types) {
        if (!attack_type_load) {
            var data = {
                        'attack_types': my_attack_types.toString(),
            };
            $.ajax({
                type: "POST",
                url: attack_type_modify,
                data: data,
                datatype: 'json',
            });
        }
    }