function $rt_layout_sizeof(o)
{    
    var t = $rt_obj_get_header(o);
    if ($ir_eq_i32(t, LAYOUT_STR))
    {    
        return $rt_str_sizeof(o);
    }
    if ($ir_eq_i32(t, LAYOUT_STRTBL))
    {    
        return $rt_strtbl_sizeof(o);
    }
    if ($ir_eq_i32(t, LAYOUT_ROPE))
    {    
        return $rt_rope_sizeof(o);
    }
    if ($ir_eq_i32(t, LAYOUT_OBJ))
    {    
        return $rt_obj_sizeof(o);
    }
    if ($ir_eq_i32(t, LAYOUT_CLOS))
    {    
        return $rt_clos_sizeof(o);
    }
    if ($ir_eq_i32(t, LAYOUT_CELL))
    {    
        return $rt_cell_sizeof(o);
    }
    if ($ir_eq_i32(t, LAYOUT_ARR))
    {    
        return $rt_arr_sizeof(o);
    }
    if ($ir_eq_i32(t, LAYOUT_ARRTBL))
    {    
        return $rt_arrtbl_sizeof(o);
    }
    $rt_assert(false, "invalid layout in layout_sizeof");
}