function upload_case_template() {

    if ($("#input_upload_case_template").val() !== "")
    {
        var file = $("#input_upload_case_template").get(0).files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            fileData = e.target.result
            var data = new Object();
            data['csrf_token'] = $('#csrf_token').val();
            data['case_template_json'] = fileData;

            post_request_api('/manage/case-templates/add', JSON.stringify(data), false, function() {
                window.swal({
                      title: "Adding...",
                      text: "Please wait",
                      icon: "/static/assets/img/loader.gif",
                      button: false,
                      allowOutsideClick: false
                });
            })
           .done((data) => {
                notify_auto_api(data);
                jsdata = data;
                if (jsdata.status == "success") {
                    refresh_case_template_table();
                    $('#modal_upload_case_template').modal('hide');
                }
           })
           .fail((error) => {
                let data = error.responseJSON;
                $('#alert_upload_case_template').text(data.message);
                if (data.data && data.data.length > 0) {

                    let output='<li>'+ sanitizeHTML(data.data) +'</li>';
                    $('#upload_case_template_err_details_list').append(output);

                    $('#alert_upload_case_template_details').show();
                }
                $('#alert_upload_case_template').show();
            })
            .always((data) => {
                $("#input_upload_case_template").val("");
                window.swal.close();
            });

        };
        reader.readAsText(file);
    }


    return false;
}