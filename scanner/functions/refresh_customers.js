async function refresh_customers() {
    await get_request_api('customers/list')
    .done((data) => {
        if(notify_auto_api(data, true)) {
            current_customers_list = data.data;
        }
    });
}