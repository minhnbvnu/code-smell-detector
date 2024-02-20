function create_dialog(elem, width, height) {
    var dlg = $(elem).dialog({
        autoOpen:false,
        modal:true,
        width: "auto",
        height: "auto"
    });
    dlg.append('<div class="message"></div>').hide();
    return dlg;
}