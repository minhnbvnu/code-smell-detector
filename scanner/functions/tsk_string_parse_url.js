function tsk_string_parse_url(s_url) {
    if (!s_url) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    var i_0 = s_url.indexOf("://");
    var i_1 = s_url.lastIndexOf(":");
    if (i_0 == -1 || i_1 == -1) {
        tsk_utils_log_error(s_url + " not valid as url");
        return null;
    }
    var ao_params = new Array();
    ao_params.push(s_url.substring(0, i_0));
    ao_params.push(s_url.substring((i_0 + 3), i_1));

    try {
        var i_3 = s_url.substring(i_0 + 3).indexOf("/");
        if (i_3 == -1) {
            ao_params.push(parseInt(s_url.substring(i_1 + 1), 10));
        }
        else {
            ao_params.push(parseInt(s_url.substring(i_1 + 1, i_3 + i_0 + 3), 10));
            ao_params.push(s_url.substring(i_3 + i_0 + 3 + 1));
        }
    }
    catch (e) {
        tsk_utils_log_error(e);
        return null;
    }

    return ao_params;
}