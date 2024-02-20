function modal_maximize() {
    id = $('#minimized_modal_box').data('target-id');
    $("#" + id).modal("show");
    $("#minimized_modal_box").hide();
}