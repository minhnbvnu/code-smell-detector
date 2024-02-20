function convertValue(val, type)
    {
        switch (type) {
            case 'float':
            case '+float':
                return parseFloat(val);
            case 'int':
            case '+int':
                return parseInt(val);
            case 'boolean':
                if ($ir_is_string(val))
                {
                    if (/^(1|on|yes|true)$/i.test(val)) return true;
                    else if (/^(0|off|no|false)$/i.test(val)) return false;
                }
                return val;
            default:
                return val;
        }
    }