function emailLogin() {
    $('#emailLoginError1').html("");
    $.ajax({
        type: "post",
        url: "/email-login",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
            emailID: $('#emailLoginId').val()
        },
        beforeSend: function () {
        },
        success: function (response) {
            if (response.code === 200) {
                $('#emailSignInModal').toggle();
                toastr.success(response.message);
                window.location.reload();
            } else if (response.code === 201) {
                $("#emailLoginError1").html(response.message[0]);
            } else {
                toastr.error(response.message);
            }
        },
        error: function () {
            toastr.error("Not able to load");
        }
    });
}