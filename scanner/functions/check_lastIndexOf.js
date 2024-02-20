function check_lastIndexOf(expected_arr, expected_res, arr, searchElement, fromIndex)
{
    var res;

    if (fromIndex !== undefined)
        res = arr.lastIndexOf(searchElement, fromIndex);
    else
        res = arr.lastIndexOf(searchElement);

    check_equal_arrays(arr, expected_arr, "lastIndexOf input array");

    if (res !== expected_res)
        throw "lastIndexOf result bad";
}