function check_concat(expected_arr, expected_res, arr, arg1, arg2, arg3)
{
    var res;

    if (arg3 !== undefined)
        res = arr.concat(arg1, arg2, arg3);
    else if (arg2 !== undefined)
        res = arr.concat(arg1, arg2);
    else if (arg1 !== undefined)
        res = arr.concat(arg1);
    else
        res = arr.concat();

    check_equal_arrays(arr, expected_arr, "concat input array");
    check_equal_arrays(res, expected_res, "concat result");
}