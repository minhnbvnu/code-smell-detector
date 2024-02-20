function tsk_string_to_object(s_str) {
     if(!tsk_string_is_null_or_empty(s_str)){
        try{ eval("var obj = " + s_str + ";"); return obj; }
        catch(e){}
     }
}