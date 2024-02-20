function $rt_strToInt(strVal)
{
    // TODO: add radix support

    var strLen = $rt_str_get_len(strVal);

    var intVal = 0;
    var neg = false;
    var state = 'PREWS';

    // For each string character
    for (var i = 0; $ir_lt_i32(i, strLen);)
    {
        var ch = $rt_str_get_data(strVal, i);

        if ($ir_eq_refptr(state, 'PREWS'))
        {
            // Space or tab
            if ($ir_eq_i32(ch, 32) || $ir_eq_i32(ch, 9))
            {
                i = $ir_add_i32(i, 1);
            }

            // + or -
            else if ($ir_eq_i32(ch, 43) || $ir_eq_i32(ch, 45))
            {
                state = 'SIGN';
            }

            // Any other character
            else
            {
                state = 'DIGITS';
            }
        }
        else if ($ir_eq_refptr(state, 'SIGN'))
        {
            // Plus sign
            if ($ir_eq_i32(ch, 43))
            {
                i = $ir_add_i32(i, 1);
            }

            // Minus sign
            else if ($ir_eq_i32(ch, 45))
            {
                neg = true;
                i = $ir_add_i32(i, 1);
            }

            state = 'DIGITS';
        }
        else if ($ir_eq_refptr(state, 'DIGITS'))
        {
            // If this is not a digit
            if ($ir_lt_i32(ch, 48) || $ir_gt_i32(ch, 57))
            {
                state = 'POSTWS';
                continue;
            }

            var digit = ch - 48;

            intVal = 10 * intVal + digit;

            i = $ir_add_i32(i, 1);
        }
        else if ($ir_eq_refptr(state, 'POSTWS'))
        {
            // If this is not a space or tab
            if ($ir_ne_i32(ch, 32) && $ir_ne_i32(ch, 9))
            {
                // Invalid number
                return NaN;
            }

            i = $ir_add_i32(i, 1);
        }
        else
        {
            throw "invalid state";
        }
    }

    if ($ir_eq_bool(neg, true))
        intVal *= -1;

    return intVal;
}