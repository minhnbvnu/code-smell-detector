async function update_ucases_list(show_all=false) {
    $('#ucases_list').empty();
    get_raw_request_api("/user/cases/list" + case_param() + "&show_closed=" + show_all)
    .done((data) => {
        if (notify_auto_api(data, true)) {
            UserCasesTable.clear();
            UserCasesTable.rows.add(data.data);
            UserCasesTable.columns.adjust().draw();
            UserCasesTable.buttons().container().appendTo($('#ucases_table_info'));
            $('[data-toggle="popover"]').popover();
            $('#ucases_last_updated').text("Last updated: " + new Date().toLocaleTimeString());
        }
    });
}