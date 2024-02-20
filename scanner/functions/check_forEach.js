function check_forEach(expected_arr, expected_sum, arr)
{
    var callbackfn = check_forEach_callbackfn;
    var thisArg = undefined;

    check_forEach_sum = 0;
    arr.forEach(callbackfn, thisArg);

    check_equal_arrays(arr, expected_arr, "forEach input array");

    if (check_forEach_sum !== expected_sum)
        throw "forEach sum bad";
}