function refresh_ds(){
    reset_ds_file_view();
    load_datastore();
    notify_success('Datastore refreshed');
}