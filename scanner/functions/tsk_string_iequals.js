function tsk_string_iequals(s_1, s_2) {
    if (s_1 && s_2) {
        return s_1.toLowerCase() == s_2.toLowerCase();
    }
    return (s_1 == s_2);
}