function clear_server_msg(item_type_or_dlg) {
    var form = item_type_or_dlg;
    if (typeof(form) == "string") {
        form = $('#add-'+item_type_or_dlg+'-form');
    }
    form.find('.message').hide().html('');
}