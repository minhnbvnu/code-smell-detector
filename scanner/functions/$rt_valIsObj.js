function $rt_valIsObj(val)
{
    return ($ir_is_object(val) || $ir_is_array(val) || $ir_is_closure(val));
}