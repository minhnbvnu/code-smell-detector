function send_add_case(data_sent) {

    post_request_api('/manage/cases/add', JSON.stringify(data_sent), true, function () {
        $('#submit_new_case_btn').text('Checking data..')
            .attr("disabled", true)
            .removeClass('bt-outline-success')
            .addClass('btn-success', 'text-dark');
    })
    .done((data) => {
        if (notify_auto_api(data, true)) {
            let case_id = data.data.case_id;
            swal("That's done !",
                "Case has been successfully created",
                "success",
                {
                    buttons: {
                        dash: {
                            text: "Go to dashboard",
                            value: "dash",
                            color: '#d33'
                        },
                        go_case: {
                            text: "Switch to newly created case",
                            value: "go_case"
                        }
                    }
                }
            ).then((value) => {
                switch (value) {

                    case "dash":
                        window.location.replace("/dashboard" + case_param());
                        break;

                    case 'go_case':
                        window.location.replace("/case?cid=" + case_id);

                    default:
                        window.location.replace("/case?cid=" + case_id);
                }
            });
        }
    })
    .always(() => {
        $('#submit_new_case_btn')
        .attr("disabled", false)
        .addClass('bt-outline-success')
        .removeClass('btn-success', 'text-dark');
    })
    .fail(() => {
        $('#submit_new_case_btn').text('Save');
    })

}