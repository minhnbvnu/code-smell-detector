function toggle_preferred_action_from_jtable(e) {
    e.preventDefault();
    var me = $(e.currentTarget);
    var obj_id = me.attr('data-id');
    var obj_type = me.attr('data-type');
    $.ajax({
        type: "POST",
        data: {'obj_type': obj_type, 'obj_id': obj_id},
        url: add_preferred_actions,
        success: function(data) {
            if (data.success == false) {
                error_message_dialog("Error", data.message);
            }
        }
    });
}