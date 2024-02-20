function check_sort(expected_arr, expected_res, arr, comparefn)
{
    var res;

    if (comparefn !== undefined)
        res = arr.sort(comparefn);
    else
        res = arr.sort();

    check_equal_arrays(arr, expected_arr, "sort input array");
    check_equal_arrays(res, expected_res, "sort result");
}