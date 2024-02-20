function on_done_hash(result) {
    $('#btn_rfile_proc').text('Done processing');
    $('form#form_edit_rfile #file_hash').val(result);
    $('form#form_edit_rfile #filename').val(document.getElementById("input_autofill").files[0].name);
    $('form#form_edit_rfile #file_size').val(document.getElementById("input_autofill").files[0].size);
}