function check_shift(expected_arr, expected_res, arr)
{
    var res = arr.shift();

    check_equal_arrays(arr, expected_arr, "shift input array");

    if (res !== expected_res)
        throw "shift result bad";
}