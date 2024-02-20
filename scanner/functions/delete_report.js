function delete_report(id) {

    swal({
      title: "This will delete the report template\nAre you sure?",
      text: "You won't be able to revert this !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((willDelete) => {
      if (willDelete) {
          post_request_api('/manage/templates/delete/' + id)
          .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_template_table();
                    $('#modal_add_report_template').modal('hide');
                }
          });
      } else {
        swal("Pfew, that was close");
      }
    });
}