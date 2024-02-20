function $rt_arr_visit_gc(o)
{    
    $rt_arr_set_next(o, $rt_gcForward(vm, $rt_arr_get_next(o)));
    var cap = $rt_arr_get_cap(o);
    for (var i = 0; $ir_lt_i32(i, cap); i = $ir_add_i32(i, 1))
    {    
        $rt_arr_set_word(o, i, $rt_gcForward(vm, $rt_arr_get_word(o, i), $rt_arr_get_tag(o, i)));
    }
}