function refresh_customer_table(do_notify) {
    $('#customers_table').DataTable().ajax.reload();
    if (do_notify !== undefined) {
        notify_success("Refreshed");
    }
}