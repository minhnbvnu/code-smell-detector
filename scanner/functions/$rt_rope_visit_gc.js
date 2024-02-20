function $rt_rope_visit_gc(o)
{    
    $rt_rope_set_next(o, $rt_gcForward(vm, $rt_rope_get_next(o)));
    $rt_rope_set_left(o, $rt_gcForward(vm, $rt_rope_get_left(o)));
    $rt_rope_set_right(o, $rt_gcForward(vm, $rt_rope_get_right(o)));
}