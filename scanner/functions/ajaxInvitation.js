function ajaxInvitation(requestData) {
    $.ajax({
        type: "post",
        url: '/send-invite-to-add-account',
        data: {
            datas: requestData,
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        beforeSend: function () {
        },
        success: function (response) {
            if (response.code === 200) {
                for (let i = 1; i <= GlobalValue; i++) {
                    $("#userID" + i).val("");
                    $("#emailID" + i).val("");
                    $("#accountName" + i).val("");
                }
                $('#inviteModal').modal('hide');
                toastr.success('Mail sent successfully');
            } else if (response.code === 400) {
                toastr.error(response.error);
            } else if (response.code === 401) {
                toastr.error(response.error);
            } else {
                toastr.error('Some error occured');
            }

        }
    });
}