function $rt_toBool(v)
{
    if ($ir_is_bool(v))
        return $ir_eq_bool(v, true);

    if ($ir_is_int32(v))
        return $ir_ne_i32(v, 0);

    if ($ir_is_float64(v))
        return $ir_ne_f64(v, 0.0) && $ir_eq_f64(v, v);

    if ($ir_is_string(v))
        return $ir_gt_i32($rt_str_get_len(v), 0);

    if ($ir_is_object(v) || $ir_is_array(v) || $ir_is_closure(v))
        return true;

    if ($ir_is_rawptr(v))
        return $ir_ne_rawptr(v, $nullptr);

    return false;
}