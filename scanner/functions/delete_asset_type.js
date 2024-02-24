function delete_asset_type(id) {

    swal({
      title: "Are you sure?",
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
            post_request_api('/manage/asset-type/delete/' + id)
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_asset_table();
                    $('#modal_add_type').modal('hide');
                }
            });
        } else {
            swal("Pfew, that was close");
        }
    });
}