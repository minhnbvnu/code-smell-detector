function tsk_string_random_uuid() {
    // e.g. 6ba7b810-9dad-11d1-80b4-00c04fd430c8
    var s_dict = "0123456789abcdef";
    return tsk_string_format("{0}-{1}-{2}-{3}-{4}",
            tsk_string_random_from_dict(8, s_dict),
            tsk_string_random_from_dict(4, s_dict),
            tsk_string_random_from_dict(4, s_dict), 
            tsk_string_random_from_dict(4, s_dict),
            tsk_string_random_from_dict(12, s_dict));
}