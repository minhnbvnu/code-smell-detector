function check_filter(expected_arr, expected_res, expected_sum, arr)
{
    var callbackfn = check_filter_callbackfn;
    var thisArg = undefined;

    check_filter_sum = 0;
    var res = arr.filter(callbackfn, thisArg);

    check_equal_arrays(arr, expected_arr, "filter input array");
    check_equal_arrays(res, expected_res, "filter result");

    if (check_filter_sum !== expected_sum)
        throw "filter sum bad";
}