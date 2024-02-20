function remove_cases_access_user(user_id, cases, on_finish) {

    swal({
      title: "Are you sure?",
      text: "This user might not be able access these cases anymore",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    })
    .then((willDelete) => {
        if (willDelete) {
            url = '/manage/users/' + user_id + '/cases-access/delete';

            var data_sent = Object();
            data_sent['cases'] = cases;
            data_sent['csrf_token'] = $('#csrf_token').val();


            post_request_api(url, JSON.stringify(data_sent))
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_user_cac(user_id);

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