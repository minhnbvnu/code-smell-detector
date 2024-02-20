function $rt_shrinkHeap(freeSpace)
{
    assert (
        freeSpace > 0,
        'invalid free space value'
    );

    $ir_gc_collect(0);

    var heapFree = $ir_get_heap_free();
    var heapSize = $ir_get_heap_size();

    var newSize = heapSize - (heapFree - freeSpace);
    $ir_gc_collect(newSize);
}