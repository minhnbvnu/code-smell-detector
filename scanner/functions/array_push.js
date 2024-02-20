function array_push()
{
    var o = this;
    var len = o.length;

    for (var i = 0; i < $argc; i++)
        o[len+i] = $ir_get_arg(i);

    return o.length;
}