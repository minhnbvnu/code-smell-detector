function remove_members_from_group(group_id, user_id, on_finish) {

    swal({
      title: "Are you sure?",
      text: "This will remove the user from the group",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    })
    .then((willDelete) => {
        if (willDelete) {
            url = '/manage/groups/' + group_id + '/members/delete/' + user_id;
             var data_sent = {
                "csrf_token": $('#csrf_token').val()
             }
            post_request_api(url, JSON.stringify(data_sent))
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_groups();
                    refresh_group_members(group_id);

                    if (on_finish !== undefined) {
                        on_finish();
                    }

                }
            });
        }
    });

}