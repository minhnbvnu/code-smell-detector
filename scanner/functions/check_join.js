function check_join(expected_arr, expected_res, arr, sep)
{
    var res;

    if (sep !== undefined)
        res = arr.join(sep);
    else
        res = arr.join();

    check_equal_arrays(arr, expected_arr, "join input array");

    if (res !== expected_res)
        throw "join result bad";
}