function modal_minimized(id, title) {
    $("#minimized_modal_title").text(title);
    $('#minimized_modal_box').data('target-id',id);
    $("#minimized_modal_box").show();
    $("#" + id).modal("hide");
}