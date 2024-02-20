function get_identifier_types() {
        if (typeof get_actor_identifier_types !== 'undefined') {
            $.ajax({
                type: "POST",
                url: get_actor_identifier_types,
                async: true,
                success: function(data) {
                    var it_drop = $('#form-attribute_actor_identifier select#id_identifier_type');
                    it_drop.find('option').remove()
                    $.each(data.items, function(index, value) {
                        it_drop.append($('<option/>', {
                            value: value,
                            text : value
                        }));
                    });
                    $("#form-attribute_actor_identifier select#id_identifier_type :first-child").attr('selected', 'selected');
                    get_identifier_values($('#id_identifier_type').val());
                },
            });
        }
    }