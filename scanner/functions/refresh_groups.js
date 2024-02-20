function refresh_groups(do_notify) {

    get_request_api('groups/list')
    .done((data) => {
        if(notify_auto_api(data, true)) {
            current_groups_list = data.data;
            manage_groups_table.api().clear().rows.add(data.data).draw();

            if (do_notify !== undefined) {
                notify_success("Refreshed");
            }

        }
    });

}