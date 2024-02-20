function $rt_layout_visit_gc(o)
{    
    var t = $rt_obj_get_header(o);
    if ($ir_eq_i32(t, LAYOUT_STR))
    {    
        $rt_str_visit_gc(vm, o);
        return;
    }
    if ($ir_eq_i32(t, LAYOUT_STRTBL))
    {    
        $rt_strtbl_visit_gc(vm, o);
        return;
    }
    if ($ir_eq_i32(t, LAYOUT_ROPE))
    {    
        $rt_rope_visit_gc(vm, o);
        return;
    }
    if ($ir_eq_i32(t, LAYOUT_OBJ))
    {    
        $rt_obj_visit_gc(vm, o);
        return;
    }
    if ($ir_eq_i32(t, LAYOUT_CLOS))
    {    
        $rt_clos_visit_gc(vm, o);
        return;
    }
    if ($ir_eq_i32(t, LAYOUT_CELL))
    {    
        $rt_cell_visit_gc(vm, o);
        return;
    }
    if ($ir_eq_i32(t, LAYOUT_ARR))
    {    
        $rt_arr_visit_gc(vm, o);
        return;
    }
    if ($ir_eq_i32(t, LAYOUT_ARRTBL))
    {    
        $rt_arrtbl_visit_gc(vm, o);
        return;
    }
    $rt_assert(false, "invalid layout in layout_visit_gc");
}