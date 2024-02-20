function string_concat()
{
    var outStr = this;

    // Use the += operator to do concatenation lazily using ropes
    for (var i = 0; i < $argc; ++i)
        outStr += $ir_get_arg(i);

    return outStr;
}