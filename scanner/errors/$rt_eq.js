function $rt_eq(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        if ($ir_is_int32(y))
            return $ir_eq_i32(x, y);

        if ($ir_is_float64(y))
            return $ir_eq_f64($ir_i32_to_f64(x), y);

        // 0 != null
        if (x === 0 && y === null)
            return false;
    }

    else if ($ir_is_object(x))
    {
        if ($ir_is_object(y))
            return $ir_eq_refptr(x, y);

        if ($ir_is_null(y) || $rt_valIsObj(y))
            return false;
    }

    else if ($ir_is_array(x))
    {
        if ($ir_is_array(y))
            return $ir_eq_refptr(x, y);

        if ($ir_is_null(y) || $rt_valIsObj(y))
            return false;
    }

    else if ($ir_is_closure(x))
    {
        if ($ir_is_closure(y))
            return $ir_eq_refptr(x, y);

        if ($ir_is_null(y) || $rt_valIsObj(y))
            return false;
    }

    else if ($ir_is_string(x))
    {
        if ($ir_is_string(y))
            return $ir_eq_refptr(x, y);

        // string != null
        if ($ir_is_null(y))
            return false;
    }

    // If x is undefined
    else if ($ir_is_undef(x))
    {
        // undefined == null
        if ($ir_is_null(y))
            return true;

        // undefined == undefined
        if ($ir_is_undef(y))
            return true;

        return false;
    }

    // If x is null
    else if ($ir_is_null(x))
    {
        // null == undefined
        if ($ir_is_undef(y))
            return true;

        // null == null
        if ($ir_is_null(y))
            return true;

        return false;
    }

    // If x is a constant
    else if ($ir_is_bool(x))
    {
        if ($ir_is_bool(y))
            return $ir_eq_bool(x, y);
    }

    // If x is float
    else if ($ir_is_float64(x))
    {
        if ($ir_is_int32(y))
            return $ir_eq_f64(x, $ir_i32_to_f64(y));

        if ($ir_is_float64(y))
            return $ir_eq_f64(x, y);
    }

    var px = $rt_toPrim(x);
    var py = $rt_toPrim(y);

    // If x is a string
    if ($ir_is_string(px) && $ir_is_string(py))
    {
        return $ir_eq_refptr(px, py);
    }

    return $rt_eq($rt_toNumber(x), $rt_toNumber(y));
}