function decode_cell(cstr){var splt=split_cell(cstr);return{c:decode_col(splt[0]),r:decode_row(splt[1])}}