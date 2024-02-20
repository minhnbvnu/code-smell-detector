function tsk_params_tostring(o_params, c_separator){
    var s_ret = "";
    if(o_params){
        for (var i = 0; i < o_params.length; ++i) {
            if (!tsk_string_is_null_or_empty(s_ret)) {
                s_ret += c_separator;
            }
            s_ret += tsk_param_tostring(o_params[i]);
        }
    }
    return s_ret;
}