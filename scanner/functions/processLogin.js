function processLogin() {
    var uname = $('#l_username').val();
    var password = $('#l_password').val();
    var token = $('#l_token').val();
    var data = {
        username: uname,
        password: password,
        totp_pass: token,
        next_url: $.urlParam('next'),
    };
    $.ajax({
        type: "POST",
        url: login_user,
        data: data,
        datatype: 'json',
        success: function(data) {
            if (data.success) {
                window.location.replace(data.message);
            } else {
                var count = 10;
                var login_submit_button = $('.login_submit_button');
                var timer_element = $('<span id="timer"><br />Please wait ' + count + ' seconds.</span>');
                login_submit_button.attr('disabled', true).addClass("disabled");
                $('#ajax_response').html(data.message);
                $('#login_form').append(timer_element);
                function timer() {
                    count = count - 1;
                    if (count <= 0) {
                        clearInterval(counter);
                        timer_element.remove();
                        login_submit_button.attr('disabled', false).removeClass("disabled");
                        return;
                    }
                    timer_element.html("<br />Please wait " + count + " seconds.");
                }
                var counter = setInterval(timer, 1000);
            }
        }
    });
}