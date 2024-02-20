function $rt_strtbl_visit_gc(o)
{    
    $rt_strtbl_set_next(o, $rt_gcForward(vm, $rt_strtbl_get_next(o)));
    var cap = $rt_strtbl_get_cap(o);
    for (var i = 0; $ir_lt_i32(i, cap); i = $ir_add_i32(i, 1))
    {    
        $rt_strtbl_set_str(o, i, $rt_gcForward(vm, $rt_strtbl_get_str(o, i)));
    }
}