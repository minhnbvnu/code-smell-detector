function toggleItemActive(coll, oid) {
    var me = $( "a#is_active_" + oid);
    $.ajax({
        type: "POST",
        url: toggle_item_active,
        data: {
            coll: coll,
            oid: oid,
        },
        datatype: 'json',
        success: function(data) {
            if (data.success) {
                if (me.text() == "on") {
                    me.text("off");
                } else {
                    me.text("on");
                }
            }
        }
    });
}