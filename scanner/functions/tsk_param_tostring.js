function tsk_param_tostring(o_param){
    if(o_param && o_param.s_name){
        return  !tsk_string_is_null_or_empty(o_param.s_value) ? (o_param.s_name + "=" + o_param.s_value) : o_param.s_name;
    }
    return "";
}