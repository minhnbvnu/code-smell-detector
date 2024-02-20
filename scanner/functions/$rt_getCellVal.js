function $rt_getCellVal(cell)
{
    var word = $rt_cell_get_word(cell);
    var type = $rt_cell_get_tag(cell);

    //print('getCellVal: ' + $ir_make_value(word, 0));

    return $ir_make_value(word, type);
}