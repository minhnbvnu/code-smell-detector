function string_internal_toCharCodeArray(x)
{
    var s = $rt_toString(x);

    var a = [];
    a.length = s.length;

    for (var i = 0; i < s.length; i++)
        a[i] = $rt_str_get_data(s, i);

    return a;
}