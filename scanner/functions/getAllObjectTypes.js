function getAllObjectTypes(sel) {
    if (typeof(obj_types_url) != "undefined") {
        var return_data = {};
        $.ajax({
            type: "POST",
            url: obj_types_url, //defined in base.html
            async: false,
            datatype: 'json',
            success: function(data) {
                if (data.types) {
                    var sorted = [];
                    if (sel) {
                        sel.empty();
                    }
                    $.each(data.types, function(key, value) {
                        sorted.push(key);
                    });
                    sorted.sort();

                    $.each(sorted, function(index, value) {
                        if (sel) {
                            sel.append('<option value="'+value+'">'+value+'</option>');
                        } else {
                            return_data[value] = value;
                        }
                    });
                }
            }
        });
        if (!sel) {
            return return_data;
        }
    }
}