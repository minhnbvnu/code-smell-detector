function check_map(expected_arr, expected_res, expected_sum, arr)
{
    var callbackfn = check_map_callbackfn;
    var thisArg = undefined;

    check_map_sum = 0;
    var res = arr.map(callbackfn, thisArg);

    check_equal_arrays(arr, expected_arr, "map input array");
    check_equal_arrays(res, expected_res, "map result");

    if (check_map_sum !== expected_sum)
        throw "map sum bad";
}