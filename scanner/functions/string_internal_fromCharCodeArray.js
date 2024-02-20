function string_internal_fromCharCodeArray(a)
{
    // Get the array length
    var len = $rt_getArrLen(a);

    // Allocate a string object
    var strObj = $rt_str_alloc(len);

    // Copy the data into the string
    for (var i = 0; i < len; ++i)
        $rt_str_set_data(strObj, i, a[i]);

    // Attempt to find the string in the string table
    return $ir_get_str(strObj);
}