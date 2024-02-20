function get_identifier_values(type) {
        if (typeof get_actor_identifier_type_values !== 'undefined') {
            $.ajax({
                type: "POST",
                data: {'type': type},
                datatype: 'json',
                url: get_actor_identifier_type_values,
                success: function(data) {
                    var id_drop = $('#form-attribute_actor_identifier select#id_identifier');
                    id_drop.find('option').remove()
                    $.each(data.items, function(index, value) {
                        id_drop.append($('<option/>', {
                            value: value[0],
                            text : value[1],
                        }));
                    });
                },
            });
        }
    }