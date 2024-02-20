function check_indexOf(expected_arr, expected_res, arr, searchElement, fromIndex)
{
    var res;

    if (fromIndex !== undefined)
        res = arr.indexOf(searchElement, fromIndex);
    else
        res = arr.indexOf(searchElement);

    check_equal_arrays(arr, expected_arr, "indexOf input array");

    if (res !== expected_res)
        throw "indexOf result bad";
}