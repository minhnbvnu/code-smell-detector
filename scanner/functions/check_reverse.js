function check_reverse(expected_arr, expected_res, arr)
{
    var res = arr.reverse();

    check_equal_arrays(arr, expected_arr, "reverse input array");
    check_equal_arrays(res, expected_res, "reverse result");
}