function close_case(id) {
    swal({
        title: "Are you sure?",
        text: "Case ID " + id + " will be closed and will not appear in contexts anymore",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, close it!'
    })
    .then((willClose) => {
        if (willClose) {
            post_request_api('/manage/cases/close/' + id)
            .done((data) => {
                if (!refresh_case_table()) {
                    window.location.reload();
                }
                $('#modal_case_detail').modal('hide');
            });
        }
    });
}