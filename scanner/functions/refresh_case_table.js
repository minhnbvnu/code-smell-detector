function refresh_case_table() {
    if ($('#cases_table').length === 0) {
        return false;
    }
    $('#cases_table').DataTable().ajax.reload();
    $('#cases_table').DataTable().columns.adjust().draw();
    notify_success('Cases list refreshed');
    return true;
}