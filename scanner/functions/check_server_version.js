function check_server_version() {
    $.ajax({
        url: '/api/versions' + case_param(),
        type: "GET",
        dataType: "json",
        timeout: 1000,
        success: function (data) {
            server_version = data.data.iris_current;
            if (server_version == current_version) {
                add_update_log('Something was wrong - server is still in the same version', true);
                add_update_log('Please check server logs', true);
                clearInterval(intervalId);
                $('#tag_bottom').hide();
                $('#update_return_button').show();
            } else {
                add_update_log('Successfully updated from ' + current_version + ' to ' + server_version, false);
                add_update_log('You can now leave this page', false);
                clearInterval(intervalId);
                $('#tag_bottom').hide();
                $('#update_return_button').show();
            }
        },
        error: function (error) {
            log_error('Something\'s wrong, server is not answering');
            log_error('Please check server logs')
            clearInterval(intervalId);
            $('#tag_bottom').hide();
            $('#update_return_button').show();
        }
    });
}