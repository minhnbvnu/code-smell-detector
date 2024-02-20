function check_splice(expected_arr, expected_res, arr, start, end, item1, item2, item3)
{
    var res;

    if (item3 !== undefined)
        res = arr.splice(start, end, item1, item2, item3);
    else if (item2 !== undefined)
        res = arr.splice(start, end, item1, item2);
    else if (item1 !== undefined)
        res = arr.splice(start, end, item1);
    else if (end !== undefined)
        res = arr.splice(start, end);
    else if (start !== undefined)
        res = arr.splice(start);
    else
        res = arr.splice();

    check_equal_arrays(arr, expected_arr, "splice input array");
    check_equal_arrays(res, expected_res, "splice result");
}