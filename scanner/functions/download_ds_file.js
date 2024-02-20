function download_ds_file(file_id) {
    let link = build_dsfile_view_link(file_id);
    downloadURI(link, name);
}