function $rt_setArrTbl(arr, tbl)
{
    return $ir_store_refptr(arr, $rt_ARRTBL_SLOT_OFS, tbl);
}