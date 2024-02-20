function upload_interactive_data(data_blob, filename, completion_callback) {

    var data_sent = Object()
    data_sent["csrf_token"] = $('#csrf_token').val();
    data_sent["file_content"] = data_blob.split(';base64,')[1];
    data_sent["file_original_name"] = filename;

    post_request_api('/datastore/file/add-interactive', JSON.stringify(data_sent), true)
    .done(function (data){
        if(notify_auto_api(data)) {
            if (completion_callback !== undefined) {
                completion_callback(data);
            }
        }
    });
}