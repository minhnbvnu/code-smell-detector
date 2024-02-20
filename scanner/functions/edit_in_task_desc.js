function edit_in_task_desc() {
    if($('#container_task_desc_content').is(':visible')) {
        $('#container_task_description').show(100);
        $('#container_task_desc_content').hide(100);
        $('#task_edition_btn').hide(100);
        $('#task_preview_button').hide(100);
    } else {
        $('#task_preview_button').show(100);
        $('#task_edition_btn').show(100);
        $('#container_task_desc_content').show(100);
        $('#container_task_description').hide(100);
    }
}