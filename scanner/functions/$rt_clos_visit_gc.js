function $rt_clos_visit_gc(o)
{    
    $rt_clos_set_next(o, $rt_gcForward(vm, $rt_clos_get_next(o)));
    var cap = $rt_clos_get_cap(o);
    for (var i = 0; $ir_lt_i32(i, cap); i = $ir_add_i32(i, 1))
    {    
        $rt_clos_set_word(o, i, $rt_gcForward(vm, $rt_clos_get_word(o, i), $rt_clos_get_tag(o, i)));
    }
    var num_cells = $rt_clos_get_num_cells(o);
    for (var i = 0; $ir_lt_i32(i, num_cells); i = $ir_add_i32(i, 1))
    {    
        $rt_clos_set_cell(o, i, $rt_gcForward(vm, $rt_clos_get_cell(o, i)));
    }
}