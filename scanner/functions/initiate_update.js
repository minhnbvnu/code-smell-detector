function initiate_update() {
    $.ajax({
        url: '/manage/server/start-update' + case_param(),
        type: "GET",
        dataType: "json",
        beforeSend : function () {
            log_msg('Update order sent. Expecting feedback anytime soon');
        },
        success: function (data) {},
        error: function (data) {
            log_error('Unexpected error starting update');
        }
    });
}