function tsk_string_random(i_length) {
    var s_dict = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    return tsk_string_random_from_dict(i_length, s_dict);
}