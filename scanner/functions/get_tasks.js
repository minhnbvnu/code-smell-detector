function get_tasks() {
    $('#tasks_list').empty();
    show_loader();

    get_request_api("tasks/list")
    .done((data) => {
        if (data.status == 'success') {
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
                Table.MakeCellsEditable({
                    "onUpdate": callBackEditTaskStatus,
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

                Table.columns.adjust().draw();
                load_menu_mod_options('task', Table, delete_task);
                $('[data-toggle="popover"]').popover();
                Table.responsive.recalc();

                $(document)
                    .off('click', '.task_details_link')
                    .on('click', '.task_details_link', function(event) {
                    event.preventDefault();
                    let task_id = $(this).data('task_id');
                    edit_task(task_id);
                });

                set_last_state(data.data.state);
                hide_loader();
            }

    });
}