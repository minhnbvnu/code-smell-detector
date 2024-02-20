function remove_case_access_from_user(user_id, case_id, on_finish) {
    swal({
      title: "Are you sure?",
      text: "This user might not be able access this case anymore",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    })
    .then((willDelete) => {
        if (willDelete) {
            url = '/manage/users/' + user_id + '/case-access/delete';

            var data_sent = Object();
            data_sent['case'] = case_id;
            data_sent['csrf_token'] = $('#csrf_token').val();


            post_request_api(url, JSON.stringify(data_sent))
            .done((data) => {
                if(notify_auto_api(data)) {

                    if (on_finish !== undefined) {
                        on_finish();
                    }

                }
            }).always(() => {
                window.swal.close();
            });
        }
    });
}