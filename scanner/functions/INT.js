function INT(x)
    {
        if ($ir_is_float64(x))
            return $ir_f64_to_i32(x);
        else
            return x;
    }