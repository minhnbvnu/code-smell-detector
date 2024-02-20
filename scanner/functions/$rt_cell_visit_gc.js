function $rt_cell_visit_gc(o)
{    
    $rt_cell_set_next(o, $rt_gcForward(vm, $rt_cell_get_next(o)));
    $rt_cell_set_word(o, $rt_gcForward(vm, $rt_cell_get_word(o), $rt_cell_get_tag(o)));
}