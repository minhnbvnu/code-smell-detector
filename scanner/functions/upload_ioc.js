function upload_ioc() {

    var file = $("#input_upload_ioc").get(0).files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        fileData = e.target.result
        var data = new Object();
        data['csrf_token'] = $('#csrf_token').val();
        data['CSVData'] = fileData;

        post_request_api('/case/ioc/upload', JSON.stringify(data), true)
        .done((data) => {
            jsdata = data;
            if (jsdata.status == "success") {
                reload_iocs();
                $('#modal_upload_ioc').modal('hide');
                swal("Got news for you", data.message, "success");

            } else {
                swal("Got bad news for you", data.message, "error");
            }
        })
    };
    reader.readAsText(file)

    return false;
}