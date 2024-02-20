function $rt_setArrLen(arr, len)
{
    return $ir_store_u32(arr, $rt_ARRLEN_SLOT_OFS, len);
}