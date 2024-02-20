function get_link_ds_file(file_id) {

   file_id = file_id.replace('f-', '');

   link = location.protocol + '//' + location.host + '/datastore/file/view/' + file_id;
   link = link + case_param();

   navigator.clipboard.writeText(link).then(function() {
          notify_success('File link copied')
    }, function(err) {
        notify_error('Unable to copy link. Error ' + err);
        console.error('File link link', err);
    });

}