function $rt_gt(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        if ($ir_is_int32(y))
            return $ir_gt_i32(x, y);

        if ($ir_is_float64(y))
            return $ir_gt_f64($ir_i32_to_f64(x), y);

        if ($ir_is_undef(y))
            return false;
    }

    // If x is float
    else if ($ir_is_float64(x))
    {
        if ($ir_is_int32(y))
            return $ir_gt_f64(x, $ir_i32_to_f64(y));

        if ($ir_is_float64(y))
            return $ir_gt_f64(x, y);

        if ($ir_is_undef(y))
            return false;
    }

    var px = $rt_toPrim(x);
    var py = $rt_toPrim(y);

    // If x is a string
    if ($ir_is_string(px) && $ir_is_string(py))
    {
        return $rt_strcmp(px, py) > 0;
    }

    return $rt_gt($rt_toNumber(x), $rt_toNumber(y));
}