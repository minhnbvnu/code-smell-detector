function withDrawInvitaion(email) {
    let id = parseInt(window.location.pathname.split("/")[2]);
    jQuery.ajax({
        url: '/withdraw-invitation',
        type: 'get',
        data: {
            teamId: id,
            email: email
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
            if (response.code === 200) {
                toastr.success(response.message, 'SuccessFully withdrawn invitaion', {
                    timeOut: 2000,
                    fadeOut: 2000,
                    onHidden: function () {
                        window.location.reload();
                    }
                });
            } else if (response.code === 400) {
                toastr.error(response.message);
            } else {
                toastr.error(response.message);
            }
        }
    });
}