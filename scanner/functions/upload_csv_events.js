function upload_csv_events() {
    const api_path =  '/case/timeline/events/csv_upload';
    const modal_dlg = '#modal_upload_csv_events'
    const file_input = '#input_upload_csv_events'

    var file = $(file_input).get(0).files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        let fileData = e.target.result
        let data = new Object();
        data['csrf_token'] = $('#csrf_token').val();
        data['CSVData'] = fileData;

        post_request_api(api_path, JSON.stringify(data), true)
        .done((data) => {

            if (notify_auto_api(data)) {
                apply_filtering();
                $(modal_dlg).modal('hide');
                swal("Got news for you", data.message, "success");
            } else {
                //alert( JSON.stringify(data.data,null,2));
                swal("Got bad news for you", data.message, "error");
            }
        })

    };
    reader.readAsText(file)

    return false;
}