function usernameUpdate() {
    $('#account_information_save_id').attr("disabled", false);
    $('#user_name_success, #user_name_Error').html("");
    $regex = /^[a-zA-Z0-9-_]{3,32}$/;
    if ($regex.test($('#user_name_id').val())) {
        $.ajax({
            url: API_URL + API_VERSION + '/check-username-availability?username=' + $('#user_name_id').val(),
            type: 'GET',
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.code == 200) {
                    $('#user_name_success').html('✅ Valid username').css('color', 'green');
                    $('#account_information_save_id').attr("disabled", false);
                } else if (response.code == 400) {
                    $('#user_name_Error').html('❌ Already used.').css('color', 'red');
                    $('#account_information_save_id').attr("disabled", true);
                } else {
                    $('#user_name_Error').html(response.error).css('color', 'red');
                    $('#account_information_save_id').attr("disabled", true);
                }
            },
            error: function (error) {
                $('#user_name_Error').html(error).css('color', 'red');
                $('#account_information_save_id').attr("disabled", true);
            }
        });
    } else {
        $('#user_name_Error').html('❌ Invalid Username').css('color', 'red')
        $('#account_information_save_id').attr("disabled", true);
    }
}