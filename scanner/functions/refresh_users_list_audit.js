function refresh_users_list_audit() {
    get_request_api('/manage/users/list')
    .done((data) => {

        if(notify_auto_api(data, true)) {

            $('#users_audit_select').selectpicker({
                liveSearch: true,
                title: "Select user to audit",
                style: "btn-outline-white",
                size: 10
            });
            data_select = [];
            for (user in data.data) {
                label = `${sanitizeHTML(data.data[user].user_login)} (${sanitizeHTML(data.data[user].user_name)} - ${sanitizeHTML(data.data[user].user_email)})`;
                $("#users_audit_select").append('<option value="'+data.data[user].user_id+'">'+label+'</option>');
            }
            $("#users_audit_select").selectpicker("refresh");
            $("#users_audit_select").show();

        }
    });
}