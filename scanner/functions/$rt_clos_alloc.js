function $rt_clos_alloc(cap, num_cells)
{    
    var o = $ir_alloc_closure($rt_clos_comp_size(cap, num_cells));
    $rt_clos_set_cap(o, cap);
    $rt_clos_set_num_cells(o, num_cells);
    $rt_clos_set_header(o, 4);
    return o;
}