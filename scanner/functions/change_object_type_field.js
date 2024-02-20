function change_object_type_field(e) {
    var elem = $(e.currentTarget);
    var dialog = elem.closest(".ui-dialog");
    if (!dialog,length) {
    dialog = $(e.currentTarget).closest("div"); // At least find a container for -static versions
    }
    var form = dialog.find("form");

    var value_field = $(form).find('#id_value');
    var indicator_field = $(form).find('#id_add_indicator');
    var target = elem.find('option:selected');
    var value_val = target.val();
    var new_value_field;

    if (value_val == "File Upload") {
        new_value_field = $('<input type="file" name="value" id="id_value">');
        indicator_field.attr("disabled", true);
    } else { //assume "string"
        new_value_field = $('<textarea name="value" rows="4" cols="28" id="id_value" />');
        indicator_field.removeAttr("disabled");
    }
    value_field.replaceWith(new_value_field);
}