function save_ds_file(node, file_id) {
    var formData = new FormData($('#form_new_ds_file')[0]);
    formData.append('file_content', $('#input_upload_ds_file').prop('files')[0]);

    if (file_id === undefined) {
        uri = '/datastore/file/add/' + node;
    } else {
        uri = '/datastore/file/update/' + file_id;
    }

    post_request_data_api(uri, formData, true, function() {
        window.swal({
              title: "File is uploading",
              text: "Please wait. This window will close automatically when the file is uploaded.",
              icon: "/static/assets/img/loader.gif",
              button: false,
              allowOutsideClick: false
        });
    })
    .done(function (data){
        if(notify_auto_api(data)){
            $('#modal_ds_file').modal("hide");
            reset_ds_file_view();
            load_datastore();
        }
    })
    .always((data) => {
        window.swal.close();
    });
}