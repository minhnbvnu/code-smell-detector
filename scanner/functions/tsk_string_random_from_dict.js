function tsk_string_random_from_dict(i_length, s_dict) {
    var s_ret = "";
    for (var i = 0; i < i_length; i++) {
        s_ret += s_dict[Math.floor(Math.random() * s_dict.length)];
    }
    return s_ret;
}