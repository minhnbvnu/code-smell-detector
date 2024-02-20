function update_case_template(ctempl_id, editor, partial, complete){
    event.preventDefault();

    let data_sent = Object();
    data_sent['case_template_json'] = editor.getSession().getValue();
    data_sent['csrf_token'] = $("#csrf_token").val();

    $('#alert_case_template_edit').empty();
    $('#alert_case_template_details').hide();
    $('#case_template_err_details_list').empty();

    post_request_api('/manage/case-templates/update/' + ctempl_id, JSON.stringify(data_sent), false, function() {
        window.swal({
              title: "Updating...",
              text: "Please wait",
              icon: "/static/assets/img/loader.gif",
              button: false,
              allowOutsideClick: false
        });
    })
    .done((data) => {
        notify_auto_api(data);
    })
    .fail((error) => {
        let data = error.responseJSON;
        $('#submit_new_case_template').text('Update');
        $('#alert_case_template_edit').text(data.message);
        if (data.data && data.data.length > 0) {
            let output='<li>'+ sanitizeHTML(data.data) +'</li>';
            $('#case_template_err_details_list').append(output);

            $('#alert_case_template_details').show();
        }
        $('#alert_case_template_edit').show();
    })
    .always((data) => {
        window.swal.close();
    });

    return false;
}