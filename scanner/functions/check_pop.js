function check_pop(expected_arr, expected_res, arr)
{
    var res = arr.pop();

    check_equal_arrays(arr, expected_arr, "pop input array");

    if (res !== expected_res)
        throw "pop result bad";
}