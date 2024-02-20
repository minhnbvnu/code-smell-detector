function check_toString(expected_arr, expected_res, arr)
{
    var res = arr.toString();

    check_equal_arrays(arr, expected_arr, "toString input array");

    if (res !== expected_res)
        throw "toString result bad";
}