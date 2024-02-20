function toggleUserActive(user) {
    var me = $('#is_active_' + user);
    $.ajax({
        type: 'POST',
        url: toggle_user_active,
        data: {
            username: user,
        },
        datatype: 'json',
        success: function(data) {
            if (data.success) {
                if (me.text() == "True") {
                    me.text("False")
                } else {
                    me.text("True")
                }
            }
        }
    });
}