function ds_file_select(file_id) {
    file_id = '#'+ file_id;
    if ($(file_id).hasClass('file-selected')) {
        $(file_id + '> i').removeClass('fa-circle-check');
        $(file_id + '> i').addClass('fa-circle');
        $(file_id).removeClass('file-selected');
    } else {
        $(file_id+ '> i').removeClass('fa-circle');
        $(file_id+ '> i').addClass('fa-circle-check');
        $(file_id).addClass('file-selected');
    }
    $('#msg_mv_files').text($('.file-selected').length);
}