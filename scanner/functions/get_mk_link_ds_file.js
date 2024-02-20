function get_mk_link_ds_file(file_id, filename, file_icon, has_password) {

   let link = build_dsfile_view_link(file_id);

   filename = sanitizeHTML(fromBinary64(filename));


   if (has_password == 'false' && ['png', 'svg', 'jpeg', 'jpg', 'webp', 'bmp', 'gif'].includes(filename.split('.').pop())) {
        mk_link = `![${filename}](${link} =40%x40%)`;
    } else {
        file_icon = atob(file_icon);
        mk_link = `[${file_icon} [DS] ${filename}](${link})`;
    }

   navigator.clipboard.writeText(mk_link).then(function() {
          notify_success('Markdown file link copied')
    }, function(err) {
        notify_error('Unable to copy link. Error ' + err);
        console.error(`Markdown file link ${md_link}`, err);
    });

}