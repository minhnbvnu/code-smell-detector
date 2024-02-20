async function update_gtasks_list() {
    $('#gtasks_list').empty();

    return get_request_api("/global/tasks/list")
    .done((data) => {
        if(notify_auto_api(data, true)) {
            Table.MakeCellsEditable("destroy");
            tasks_list = data.data.tasks;

            options_l = data.data.tasks_status;
            options = [];
            for (index in options_l) {
                option = options_l[index];
                options.push({ "value": option.id, "display": option.status_name })
            }

            Table.clear();
            Table.rows.add(tasks_list);

            Table.columns.adjust().draw();
            Table.buttons().container().appendTo($('#gtasks_table_info'));
               $('[data-toggle="popover"]').popover();

            load_menu_mod_options('global_task', Table, delete_gtask);
            $('#tasks_last_updated').text("Last updated: " + new Date().toLocaleTimeString());
        }
    });
}