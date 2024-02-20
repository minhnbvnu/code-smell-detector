function refresh_client_cases(customer_id) {
    get_raw_request_api(`/manage/cases/filter?case_customer_id=${customer_id}`)
        .done((data) => {
            if (notify_auto_api(data, true)) {
                cases_table.api().clear().rows.add(data.data.cases).draw();
            }
        })

}