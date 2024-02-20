function remove_case(id) {

    swal({
        title: "Are you sure?",
        text: "You are about to delete this case forever. This cannot be reverted.\nAll associated data will be deleted",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
        .then((willDelete) => {
            if (willDelete) {
                post_request_api('/manage/cases/delete/' + id)
                .done((data) => {
                    if (notify_auto_api(data)) {
                        if (!refresh_case_table()) {
                            swal({
                                title: "Done!",
                                text: "You will be redirected in 5 seconds",
                                icon: "success",
                                buttons: false,
                                dangerMode: false
                            })
                            setTimeout(function () {
                                window.location.href = '/dashboard?cid=1';
                            }, 4500);
                        } else {
                            refresh_case_table();
                            $('#modal_case_detail').modal('hide');
                        }
                    }
                });
            } else {
                swal("Pfew, that was close");
            }
        });
}