function new_role_dialog(e) {
    if (do_copy) {
        var dialog = $(this).find("form");
        var copy_from = dialog.find('#id_copy_from');
        if (typeof(rid) === "undefined") {
            rid = '';
        }
        copy_from.val(rid);
    }
}