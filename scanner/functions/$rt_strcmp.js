function $rt_strcmp(strA, strB)
{
    // Get the length of both strings
    var lenA = $rt_str_get_len(strA);
    var lenB = $rt_str_get_len(strB);

    // Compute the minimum of both string lengths
    var minLen = $ir_lt_i32(lenA, lenB)? lenA:lenB;

    // For each character to be compared
    for (var i = 0; $ir_lt_i32(i, minLen); i = $ir_add_i32(i, 1))
    {
        var ch1 = $rt_str_get_data(strA, i);
        var ch2 = $rt_str_get_data(strB, i);

        if ($ir_lt_i32(ch1, ch2))
            return -1;
        if ($ir_gt_i32(ch1, ch2))
            return 1;
    }

    if ($ir_lt_i32(lenA, lenB))
        return -1;
    if ($ir_gt_i32(lenB, lenA))
        return 1;
    return 0;
}