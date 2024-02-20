function ping_check_server_online() {

    $.ajax({
        url: '/api/ping' + case_param(),
        type: "GET",
        dataType: "json",
        timeout: 1000,
        success: function (data) {
            $("#offline_time").hide();
            log_msg('Server is back online');
            clearInterval(intervalId);
            check_server_version();
        },
        error: function (error) {
            no_resp_time += 1;
            if (no_resp_time > 29) {
                log_error('Something\'s wrong, server is not answering');
                log_error('Please check server logs')
                clearInterval(intervalId);
                $('#tag_bottom').hide();
                $('#update_return_button').show();
            }
            $("#offline_time").html('<h4 id="offline_time"><i class="fas fa-clock"></i> Attempt '+ no_resp_time +' / 30</h4><br/>');
            $("#offline_time").show();
        }
    });
}