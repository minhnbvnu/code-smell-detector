function $rt_strcat(strA, strB)
{
    // Get the length of both strings
    var lenA = $rt_str_get_len(strA);
    var lenB = $rt_str_get_len(strB);

    // Allocate a string object
    var lenO = $ir_add_i32(lenA, lenB);
    var strO = $rt_str_alloc(lenO);

    // Output pointer
    var dataO = $ir_add_ptr_i32(strO, $rt_str_ofs_data(strO, 0));

    // A string pointers
    var dataA = $ir_add_ptr_i32(strA, $rt_str_ofs_data(strA, 0));
    var endA = $ir_add_ptr_i32(dataA, $ir_lsft_i32($ir_rsft_i32(lenA, 2), 3));

    // 8 by 8 copy
	while ($ir_ne_rawptr(dataA, endA))
	{
        $ir_store_u64(dataO, 0, $ir_load_u64(dataA, 0));
        dataA = $ir_add_ptr_i32(dataA, 8);
        dataO = $ir_add_ptr_i32(dataO, 8);
	}

    var remA = $ir_and_i32(lenA, 3);

    // Tail remainder copy
	switch (remA)
	{
	    case 3: $ir_store_u16(dataO, 4, $ir_load_u64(dataA, 4));
	    case 2: $ir_store_u16(dataO, 2, $ir_load_u64(dataA, 2));
	    case 1: $ir_store_u16(dataO, 0, $ir_load_u64(dataA, 0));
	};

    dataO = $ir_add_ptr_i32(dataO, $ir_lsft_i32(remA, 1));

    // B string pointers
    var dataB = $ir_add_ptr_i32(strB, $rt_str_ofs_data(strB, 0));
    var endB = $ir_add_ptr_i32(dataB, $ir_lsft_i32($ir_rsft_i32(lenB, 2), 3));

    // 8 by 8 copy
	while ($ir_ne_rawptr(dataB, endB))
	{
        $ir_store_u64(dataO, 0, $ir_load_u64(dataB, 0));
        dataB = $ir_add_ptr_i32(dataB, 8);
        dataO = $ir_add_ptr_i32(dataO, 8);
	}

    var remB = $ir_and_i32(lenB, 3);

    // Tail remainder copy
	switch (remB)
	{
	    case 3: $ir_store_u16(dataO, 4, $ir_load_u64(dataB, 4));
	    case 2: $ir_store_u16(dataO, 2, $ir_load_u64(dataB, 2));
	    case 1: $ir_store_u16(dataO, 0, $ir_load_u64(dataB, 0));
	};

    // Find/add the concatenated string in the string table
    return $ir_get_str(strO);
}