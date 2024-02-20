function renew_api() {
    swal({
        title: "Are you sure?",
        text: "The current key will be revoked and cannot be used anymore",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Go for it'
    })
        .then((willDelete) => {
            if (willDelete) {
                get_request_api('/user/token/renew')
                .done((data) => {
                    if(notify_auto_api(data)) {
                        location.reload(true);
                    }
                })
            } else {
                swal("Pfew, that was close");
            }
        });
}