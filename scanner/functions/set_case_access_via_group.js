function set_case_access_via_group(case_id) {
    var data = {
        "case_id": parseInt(case_id),
        "access_level": parseInt($('#group_case_ac_select').val()),
        "group_id": parseInt($('#group_case_access_select').val()),
        "csrf_token": $('#csrf_token').val()
    };

    post_request_api('/case/access/set-group', JSON.stringify(data))
    .done((data) => {
        notify_auto_api(data);
        access_case_info_reload(case_id);
        $('#modal_ac_additional').modal('hide');
    });

}