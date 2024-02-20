function cstr(str, len)
    {
        str = $rt_toString(str);

        var c_str, i;
        len = len || str.length;
        c_str = c.malloc(len + 1);

        for (i = 0; i < len; i++)
            $ir_store_u8(c_str, i, $rt_str_get_data(str, i));

        $ir_store_u8(c_str, len, 0);
        return c_str;
    }