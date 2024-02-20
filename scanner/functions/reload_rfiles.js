function reload_rfiles(notify) {
    get_case_rfiles();
    if (notify !== undefined) {
        notify_success("Refreshed");
    }
}