function check_slice(expected_arr, expected_res, arr, start, end)
{
    var res = arr.slice(start, end);

    check_equal_arrays(arr, expected_arr, "slice input array");
    check_equal_arrays(res, expected_res, "slice result");
}