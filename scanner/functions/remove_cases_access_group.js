function remove_cases_access_group(group_id, cases, on_finish) {

    swal({
        title: "Are you sure?",
        text: "Members of this group won't be able to access these cases anymore",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove them!'
    }).then((willDelete) => {
        if (willDelete) {
            url = '/manage/groups/' + group_id + '/cases-access/delete';

            window.swal({
              title: "Updating access",
              text: "Please wait. We are updating users access.",
              icon: "/static/assets/img/loader_cubes.gif",
              button: false,
              allowOutsideClick: false
            });
            var data_sent = Object();
            data_sent['cases'] = cases;
            data_sent['csrf_token'] = $('#csrf_token').val();

            post_request_api(url, JSON.stringify(data_sent))
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_group_cac(group_id);
                    if (on_finish !== undefined) {
                        on_finish();
                    }
                }
            })
            .always(() => {
                window.swal.close();
            });
        }
    });
}