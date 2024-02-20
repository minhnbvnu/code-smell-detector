function updateObjectSource(value, settings, elem, update) {
    var guardian = $(elem).closest("tr");
    var guard = $(elem).parent();
        var data = {
            coll: $(guardian).attr('coll'),
            oid: $(guardian).attr('oid'),
            type: $(guardian).attr('type'),
            value: $(guardian).attr('vvalue'),
        };

    data['new_source'] =  $(guard).find("span[name='source_name']").attr('sname');
    data['new_method'] =  $(guard).find("span[name='source_method']").attr('method');
    data['new_reference'] =  $(guard).find("span[name='source_reference']").attr('reference');

        if (update == "name") {
            data['new_source'] =  value;
        } else if (update == "method") {
            data['new_method'] =  value;
    } else {
            data['new_reference'] =  value;
        };
        $.ajax({
            type: "POST",
            async: false,
            url: update_objects_source,
            data: data,
        });
        return value;
}