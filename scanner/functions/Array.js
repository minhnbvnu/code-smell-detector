function Array(len)
{
    // Call with length
    if ($ir_eq_i32($argc, 1) && ($ir_is_int32(len) || $ir_is_float64(len)))
    {
        // Convert the length to a uint32 value
        len = $rt_toUint32(len);

        // Allocate an array of the desired length
        var a = $rt_newArr(len);

        return a;
    }

    // Allocate an array of the desired length
    var a = $rt_newArr($argc);

    // Copy the arguments into the array
    for (var i = 0; i < $argc; ++i)
        a[i] = $ir_get_arg(i);

    return a;
}