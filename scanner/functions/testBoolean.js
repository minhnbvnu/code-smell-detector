function testBoolean(val)
    {
        if ($ir_is_string(val))
            return /^(1|on|yes|true|0|off|no|false)$/i.test(val);
        else if (typeof val === 'boolean')
            return true;
        return false;
    }