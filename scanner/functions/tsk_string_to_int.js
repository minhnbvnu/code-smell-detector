function tsk_string_to_int(s_str, i_default) {
    try{ return parseInt(s_str); }
    catch(e){ return i_default; }
}