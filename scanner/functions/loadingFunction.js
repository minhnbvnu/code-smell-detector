function loadingFunction(text, val) {
    let loader_text = '';
    let loader = '';
    if (val === 1) {
        loader += '<div class="d-flex justify-content-center">' +
            '<div class="spinner spinner-primary spinner-lg mr-15"></div></div>';
        $('#loader_id').empty().append(loader);
    }
    loader_text += '<div class="d-flex justify-content-center">';
    loader_text += (val === 1) ? '<span>' + text + '</span></div>' : '<span style="color:red">' + text + '</span></div>';
    $('#loader_text_id').empty().append(loader_text);
    $('#loader_text_id').show();
}