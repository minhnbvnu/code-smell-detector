function tsk_buff_str2ib(s_str) {
    if (!s_str) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }
    var len = s_str.length;
    var ib = new Array(len);
    for (var i = 0; i < len; ++i) {
        ib[i] = s_str.charCodeAt(i);
    }
    return ib;
}