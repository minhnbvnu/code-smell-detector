function init_db_backup() {

    get_request_api('/manage/server/backups/make-db')
    .done((data) => {
            msg = ""
            for (idx in data.data) {
                msg += data.data[idx] + '\n';
            }
            swal("Done",
             msg,
            {
                icon: "success"
            });
    })
    .fail((error) => {
        for (idx in error.responseJSON.data) {
            msg += data.data[idx] + '\n';
        }

        swal("Error",
         msg,
        {
            icon: "error"
        });
    });
}