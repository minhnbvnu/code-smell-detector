function identifier_attribution_dialog(e) {
        var dialog = $(this).find("form").find("table");
        var it_drop = $('#form-attribute_actor_identifier select#id_identifier_type');
        var id_drop = $('#form-attribute_actor_identifier select#id_identifier');
        it_drop.find('option').remove()
        id_drop.find('option').remove()
        $('<input>').attr({
            type: 'hidden',
            id: 'id',
            name: 'id',
            value: subscription_id
        }).appendTo(dialog);
        get_identifier_types();
    }