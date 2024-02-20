function toggle_select_file() {
    if ($('.btn-ds-bulk-selector').hasClass('active')) {
        reset_ds_file_view();
        load_datastore();
    } else {
        $('.ds-file-selector').show(250);
        $('.btn-ds-bulk').show(250);
        $('.btn-ds-bulk-selector').addClass('active');
    }
}