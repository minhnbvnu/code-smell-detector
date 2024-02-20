function add_object_submit(e) {
    // my_id and my_type are set in objects_listing_widget - also added data-id data-type attr, but not used yet
    var elem = $(e.currentTarget);
    var dialog = elem.closest(".ui-dialog");
    var form = dialog.find("form");
    if (elem.attr("id") === "add_object_static") {
    dialog = elem.closest("td");  // Not a dialog, but needed to find message box below
    form = $("#form-add-object-static");
    }
    var csrftoken = readCookie('csrftoken');
    form.append("<input type='hidden' name='csrfmiddlewaretoken' value='" + csrftoken + "'>");

    // log(elem);
    // log(form);

    form.find("#id_oid").val(my_id);
    form.find("#id_otype").val(my_type);
    var target = form.find('option:selected');
    var value_type = target.val();
    if (value_type === "File Upload") {
    form.submit();
    } else {
        e.preventDefault();
        var result = form.serializeArray();
        result.push({ 'name': 'relationship_value', 'value': relationship_value });
        // need to add from subscription the type and id of the document we are adding to
        $.ajax({
            type: "POST",
        url: form.attr('action'),
            data: result,
            datatype: 'json',
            success: function(data) {
                if (data.success) {
                    post_add_patchup(form, data);
                } else {
                    form.find('#id_object_type').change();
                }
                if (data.message) {
                    dialog.find(".message")
                        .show()
                        .css('display', 'table')
                        .effect('highlight', {}, 5000)
                        .html(data.message)
                        .delay(3000);
                }
            }
        });
    }
}