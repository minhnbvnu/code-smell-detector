function send_update_case_data() {

    /* Get the pipeline args */
    var args = Object();
    $.each($(".update-" + $('#update_pipeline_selector').val()), function(el, k) {
        args['args_' + k.id] = k.value;
    });
    args['pipeline'] = $('#update_pipeline_selector').val();
    args['csrf_token'] = $('#csrf_token').val();

    post_request_api('/manage/cases/trigger-pipeline', JSON.stringify(args), true, function () {
        $('#submit_update_case').text('Starting pipeline');
         $('#submit_update_case')
            .attr("disabled", true)
            .addClass('bt-outline-success')
            .removeClass('btn-success', 'text-dark');
    })
    .done((data) => {
        if (notify_auto_api(data, true)) {
            $('#submit_update_case').text('Saved');
            swal("That's done !",
                "Files are being processed in background.\nYou can follow the progress in DIM Tasks",
                "success",
                {
                    buttons: {
                        again: {
                            text: "Import files again",
                            value: "again"
                        },
                        dash: {
                            text: "Go to dashboard",
                            value: "dash",
                        }
                    }
                }
            ).then((value) => {
                switch (value) {

                    case "dash":
                        window.location.replace("/dashboard" + case_param());
                        break;

                    case "again":
                        window.location.replace("/case" + case_param());
                        break;

                    default:
                        window.location.replace("/case" + case_param());
                }
            });
        } else {
            $('#submit_update_case').text('Save');
            mdata = ""
            for (element in data.data) {
                mdata += data.data[element]
            }
            $.notify({
                icon: 'flaticon-error',
                title: data.message,
                message: mdata
            }, {
                type: 'danger',
                placement: {
                    from: 'top',
                    align: 'right'
                },
                time: 5000,
            });
            swal("Oh no !", data.message, "error")
        }
    })
    .fail(() => {
        $('#submit_new_case_btn').text('Save');
    })
    .always(() => {
        $('#submit_update_case')
        .attr("disabled", false)
        .addClass('bt-outline-success')
        .removeClass('btn-success', 'text-dark');
    });
}