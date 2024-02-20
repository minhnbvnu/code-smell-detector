function $rt_objHasProp(obj, propStr)
{
    var propAttrs = $ir_obj_get_attrs(obj, propStr);
    return $ir_eq_i32($ir_and_i32(propAttrs, $rt_ATTR_DELETED), 0);
}