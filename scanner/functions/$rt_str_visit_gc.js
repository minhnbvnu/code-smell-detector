function $rt_str_visit_gc(o)
{    
    $rt_str_set_next(o, $rt_gcForward(vm, $rt_str_get_next(o)));
}