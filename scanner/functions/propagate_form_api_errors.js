function propagate_form_api_errors(data_error) {

    if (typeof (data_error) === typeof (' ')) {
        notify_error(data_error);
        return;
    }

    for (let e in data_error) {
        if($("#" + e).length !== 0) {
            $("#" + e).addClass('is-invalid');
            errors = ""
            for (n in data_error[e]) {
                    errors += data_error[e][n];
                }
            if($("#" + e + "-invalid-msg").length !== 0) {
                $("#" + e + "-invalid-msg").remove();
            }
            $("#" + e).after("<div class='invalid-feedback' id='" + e + "-invalid-msg'>" + errors +"</div>");
            $("#" + e + "-invalid-msg").show();
        }
        else {
            msg = e + " - ";
            for (n in data_error[e]) {
                    msg += data_error[e][n];
            }
            notify_error(msg);
        }
    }
}