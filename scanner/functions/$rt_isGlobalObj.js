function $rt_isGlobalObj(val)
{
    return $ir_is_object(val) && $ir_eq_refptr(val, $global);
}