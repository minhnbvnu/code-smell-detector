function refresh_users(do_notify) {

    get_request_api('users/list')
    .done((data) => {

        if(notify_auto_api(data, true)) {
            current_users_list = data.data;
            manage_users_table.api().clear().rows.add(data.data).draw();

            if (do_notify !== undefined) {
                notify_success("Refreshed");
            }

        }

    });

}