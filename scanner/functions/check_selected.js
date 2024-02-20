function check_selected(type, dialog) {
    if (selected_text) {
        var obj = null;
        if (type == 'ip') {
            obj = '#id_ip';
        } else if (type == 'domain') {
            obj = '#id_domain';
        } else if (type == 'indicator') {
            obj = '#id_value';
        }
        if (obj) {
            dialog.find(obj).val(selected_text);
            selected_text = null;
        }
    }
}