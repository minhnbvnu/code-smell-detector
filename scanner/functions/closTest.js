function closTest(freeSpace)
{
    $rt_shrinkHeap(freeSpace);

    var gcCount = $ir_get_gc_count();

    var a = 0;

    while ($ir_get_gc_count() < gcCount + 1)
    {
        var clos = function () { a++; }

        clos();
    }

    if (typeof a !== 'number')
        return 1;

    if (!(a > 0))
        return 2;

    return 0;
}