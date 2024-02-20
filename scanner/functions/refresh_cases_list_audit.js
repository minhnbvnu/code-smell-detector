function refresh_cases_list_audit() {
    get_request_api('/manage/cases/list')
    .done((data) => {

        if(notify_auto_api(data, true)) {

            $('#cases_audit_select').selectpicker({
                liveSearch: true,
                title: "Select case to audit",
                style: "btn-outline-white",
                size: 10
            });
            data_select = [];
            for (caseid in data.data) {
                label = `${sanitizeHTML(data.data[caseid].case_name)}`;
                $("#cases_audit_select").append('<option value="'+data.data[caseid].case_id+'">'+label+'</option>');
            }
            $("#cases_audit_select").selectpicker("refresh");
            $("#cases_audit_select").show();

        }
    });
}