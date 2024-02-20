function tsk_strdup(s_str) {
    if (s_str) {
        return new String(s_str).toString();
    }
    return s_str;
}