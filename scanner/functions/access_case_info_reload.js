function access_case_info_reload(case_id, owner_id, reviewer_id) {
    var req_users = [];

    get_request_api('/case/users/list')
    .done((data) => {
         has_table = $.fn.dataTable.isDataTable( '#case_access_users_list_table' );
        if (!notify_auto_api(data, !has_table)) {
            return;
        }

        req_users = data.data;
        if ( has_table ) {
            table = $('#case_access_users_list_table').DataTable();
            table.clear();
            table.rows.add(req_users);
            table.draw();
        } else {
            addFilterFields($('#case_access_users_list_table').attr("id"));
            $("#case_access_users_list_table").DataTable({
                    dom: '<"container-fluid"<"row"<"col"l><"col"f>>>rt<"container-fluid"<"row"<"col"i><"col"p>>>',
                    aaData: req_users,
                    aoColumns: [
                      {
                        "data": "user_id",
                        "className": "dt-center"
                    },
                    {
                        "data": "user_name",
                        "className": "dt-center",
                        "render": function (data, type, row, meta) {
                            if (type === 'display') { data = sanitizeHTML(data);}
                            return data;
                        }
                    },
                    {
                        "data": "user_login",
                        "className": "dt-center",
                        "render": function (data, type, row, meta) {
                            if (type === 'display') { data = sanitizeHTML(data);}
                            return data;
                        }
                    },
                    {
                        "data": "user_access_level",
                        "className": "dt-center",
                        "render": function ( data, type, row ) {
                            return `<select class="form-control" onchange="update_user_case_access_level('${row.user_id}',${case_id},this.value)">${get_access_level_options(data)}</select>`;
                        }
                    }
                    ],
                    filter: true,
                    info: true,
                    ordering: true,
                    processing: true,
                    initComplete: function () {
                        tableFiltering(this.api(), 'case_access_users_list_table');
                    }
            });
        }
        let quick_owner = $('#case_quick_owner');
        let quick_reviewer = $('#case_quick_reviewer');
        quick_reviewer.append($('<option>'));


        for (let i = 0; i < req_users.length; i++) {
            $('#username-list').append($('<option>', {
                value: req_users[i].user_name
            }));
            $('#emails-list').append($('<option>', {
                value: req_users[i].user_email
            }));

            quick_owner.append($('<option>', {
                value: req_users[i].user_id,
                text: req_users[i].user_name
            }));
            if (req_users[i].user_id == owner_id) {
                quick_owner.val(req_users[i].user_id);
            }
            quick_owner.selectpicker('refresh');
            quick_reviewer.append($('<option>', {
                value: req_users[i].user_id,
                text: req_users[i].user_name
            }));
            if (req_users[i].user_id == reviewer_id) {
                quick_reviewer.val(req_users[i].user_id);
            }
            quick_reviewer.selectpicker('refresh');
        }
    });

    set_suggest_tags('case_tags');
}