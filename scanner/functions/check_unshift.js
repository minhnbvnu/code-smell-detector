function check_unshift(expected_arr, expected_res, arr, item1, item2, item3)
{
    var res;

    if (item3 !== undefined)
        res = arr.unshift(item1, item2, item3);
    else if (item2 !== undefined)
        res = arr.unshift(item1, item2);
    else if (item1 !== undefined)
        res = arr.unshift(item1);
    else
        res = arr.unshift();

    check_equal_arrays(arr, expected_arr, "unshift input array");

    if (res !== expected_res)
        throw "unshift result bad";
}