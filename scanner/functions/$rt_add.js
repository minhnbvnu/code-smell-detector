function $rt_add(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        if ($ir_is_int32(y))
        {
            var r;
            if (r = $ir_add_i32_ovf(x, y))
            {
                return r;
            }
            else
            {
                // Handle the overflow case
                var fx = $ir_i32_to_f64(x);
                var fy = $ir_i32_to_f64(y);
                return $ir_add_f64(fx, fy);
            }
        }

        if ($ir_is_float64(y))
            return $ir_add_f64($ir_i32_to_f64(x), y);
    }

    // If x is floating-point
    else if ($ir_is_float64(x))
    {
        if ($ir_is_int32(y))
            return $ir_add_f64(x, $ir_i32_to_f64(y));

        if ($ir_is_float64(y))
            return $ir_add_f64(x, y);
    }

    // If x is a string
    else if ($ir_is_string(x))
    {
        if ($ir_is_string(y))
        {
            var rope = $rt_rope_alloc();
            var len = $ir_add_i32($rt_str_get_len(x), $rt_str_get_len(y));
            $rt_rope_set_left(rope, x);
            $rt_rope_set_right(rope, y);
            $rt_rope_set_len(rope, len);
            return rope;
        }

        if ($ir_is_int32(y) || $ir_is_float64(y))
        {
            y = $rt_numToStr(y, 10);

            var rope = $rt_rope_alloc();
            var len = $ir_add_i32($rt_str_get_len(x), $rt_str_get_len(y));
            $rt_rope_set_left(rope, x);
            $rt_rope_set_right(rope, y);
            $rt_rope_set_len(rope, len);
            return rope;
        }
    }

    // If x is a rope
    else if ($ir_is_rope(x))
    {
        var sy = $ir_is_string(y)? y:$rt_toString(y);

        var rope = $rt_rope_alloc();
        var len = $ir_add_i32($rt_rope_get_len(x), $rt_str_get_len(sy));
        $rt_rope_set_left(rope, x);
        $rt_rope_set_right(rope, sy);
        $rt_rope_set_len(rope, len);
        return rope;
    }

    // Convert x and y to primitives
    var px = $rt_toPrim(x);
    var py = $rt_toPrim(y);

    // If x is a string
    if ($ir_is_string(px))
    {
        if ($ir_is_string(py))
            return $rt_strcat(px, py);

        return $rt_strcat(px, $rt_toString(py));
    }

    // If y is a string
    if ($ir_is_string(py))
    {
        return $rt_strcat($rt_toString(x), py);
    }

    // Convert both values to numbers and add them
    return $rt_add($rt_toNumber(x), $rt_toNumber(y));
}