function build_dsfile_view_link(file_id) {
   file_id = file_id.replace('f-', '');

   link = '/datastore/file/view/' + file_id;
   link = link + case_param();

   return link;
}