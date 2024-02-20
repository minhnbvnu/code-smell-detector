function refresh_client_users(customer_id) {
    get_raw_request_api(`/manage/users/filter?customer_id=${customer_id}`)
        .done((data) => {
            if (notify_auto_api(data, true)) {
                users_table.api().clear().rows.add(data.data.users).draw();
            }
        })
}