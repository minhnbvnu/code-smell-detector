async function update_utasks_list() {
    $('#utasks_list').empty();
    return get_request_api("/user/tasks/list")
    .done((data) => {
        if (notify_auto_api(data, true)) {
            UserTaskTable.MakeCellsEditable("destroy");
            tasks_list = data.data.tasks;

            $('#user_attr_count').text(tasks_list.length);
            if (tasks_list.length != 0){
                $('#icon_user_task').removeClass().addClass('flaticon-alarm text-danger');
            } else {
                $('#icon_user_task').removeClass().addClass('flaticon-success text-success');
            }
            options_l = data.data.tasks_status;
            options = [];
            for (index in options_l) {
                option = options_l[index];
                options.push({ "value": option.id, "display": option.status_name })
            }

            UserTaskTable.clear();
            UserTaskTable.rows.add(tasks_list);
            UserTaskTable.MakeCellsEditable({
                "onUpdate": callBackEditUserTaskStatus,
                "inputCss": 'form-control col-12',
                "columns": [2],
                "allowNulls": {
                  "columns": [2],
                  "errorClass": 'error'
                },
                "confirmationButton": {
                  "confirmCss": 'my-confirm-class',
                  "cancelCss": 'my-cancel-class'
                },
                "inputTypes": [
                  {
                    "column": 2,
                    "type": "list",
                    "options": options
                  }
                ]
              });

            UserTaskTable.columns.adjust().draw();
            UserTaskTable.buttons().container().appendTo($('#utasks_table_info'));
            $('[data-toggle="popover"]').popover();

            $('#utasks_last_updated').text("Last updated: " + new Date().toLocaleTimeString());
        }

    });
}