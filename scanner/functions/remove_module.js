function remove_module(id) {

    swal({
      title: "Are you sure?",
      text: "Please note this will only remove the reference of the module in Iris. The module will stay installed on the server.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    })
    .then((willDelete) => {
      if (willDelete) {
        post_request_api('/manage/modules/remove/' + id)
        .done((data) => {
            if(notify_auto_api(data)) {
              refresh_modules(true);
              refresh_modules_hooks(true);
              $('#modal_add_module').modal('hide');
            }
        });
      } else {
        swal("Pfew, that was close");
      }
    });
}