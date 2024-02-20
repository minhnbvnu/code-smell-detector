function delete_group(id) {

    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!\nPlease make sure a group remains with enough rights to avoid a lockdown!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((willDelete) => {
      if (willDelete) {
        var data_sent = {
            "csrf_token": $('#csrf_token').val()
        }
        post_request_api('/manage/groups/delete/' + id, JSON.stringify(data_sent))
        .done((data) => {
            if(notify_auto_api(data)) {
                refresh_groups();
                $('#modal_access_control').modal('hide');
            }
        });
      }
    });
}