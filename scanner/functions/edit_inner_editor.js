function edit_inner_editor(btn_id, container_id, ctrd_id) {
    $('#'+container_id).toggle();
    if ($('#'+container_id).is(':visible')) {
        $('#'+btn_id).show(100);
        $('#'+ctrd_id).removeClass('col-md-12').addClass('col-md-6');
    } else {
        $('#'+btn_id).hide(100);
        $('#'+ctrd_id).removeClass('col-md-6').addClass('col-md-12');
    }
    return false;
}