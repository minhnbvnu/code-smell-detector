function jsstrcpy(buff, jstr, len)
    {
        len = len || jstr.length;
        var i;

        for (i = 0; i < len; i++)
            $ir_store_u8(buff, i, $rt_str_get_data(jstr, i));

        $ir_store_u8(buff, len, 0);
        return buff;
    }