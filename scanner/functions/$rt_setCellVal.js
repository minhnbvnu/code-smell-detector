function $rt_setCellVal(cell, val)
{
    var word = $ir_get_word(val);
    var type = $ir_get_tag(val);

    $rt_cell_set_word(cell, word);
    $rt_cell_set_tag(cell, type);
}