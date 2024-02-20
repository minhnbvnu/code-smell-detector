function deleteClick (e) {
    var elem = $(e.currentTarget);
    var data = {};
    var type = null;

    // XXXX Maybe cleaner to convert all this to a "data-" prefix and just slurp it all in
    if (elem.attr('source_name'))
    data["name"] = $(e.currentTarget).attr('source_name'); // from delete_source_button

    if (elem.attr('prefix'))
    data['prefix'] = elem.attr('prefix');  // from delete_campaign_button

    // From delete_object
    if (elem.attr("type")) {
    type = elem.attr('type');

    $.extend(data,
         {coll: elem.attr('coll'),
             oid: elem.attr('oid'),
             name: elem.attr('name'),
             object_type: type,
             value: elem.attr('vvalue')
             });
    }

    // For generic case, freshly implemented using data-del- attributes..
    // data-* attributes are also available in jQuery .data camel cased.
    if (elem.data("delId")) {
    type = elem.data("delType");

    $.each(elem.data(), function(field,value) {
        if (field.substring(0,3) === "del") {
            var f = field.substring(3).toLowerCase();
            data[f] = value;
        }
        });
    }

    if (elem.attr('key')) {
    $.extend(data, {'key':elem.attr('key')});
    }

    var del_label = elem.attr('title') || 'Delete ' + type.capitalize();
    if (elem.data("isObject")) {
    delete_object_click(e, type, del_label, data);
    } else {
    delete_item_click(e, type, del_label, data);
    }
}