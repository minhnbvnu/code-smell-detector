function CFunGen(ret, args)
    {
        var base = ret.base_type;
        var sig_str = base;
        var i = 0;
        var l = args.length;
        var arg_str = getArgString(l);
        var fun_str;
        var arg;

        // Check if this is a return type that can be wrapped
        if (!base)
            throw new TypeError('Invalid return type for CFun: ' + ret.name);

        // Generate a sig string for $ir_call_ffi
        while (i < l)
        {
            arg = args[i++];

            // CArrays are treated as pointers
            if (arg.wrapper === 'CArray')
                base = '*';
            else
                base = arg.base_type;
            if (!base)
                throw new TypeError('Invalid arg type for CFun:' + args[--i].name);
            sig_str += ',' + base;
        }

        // Generate wrapper function
        fun_str =
           `function(fun_sym)
            {
                return function(` + arg_str  + `)
                {
                    return $ir_call_ffi(fun_sym, ` +
                        ('\'' + sig_str + '\'') +
                        (arg_str === '' ? arg_str : (', ' + arg_str)) + `);
                };
            };`;

        return eval(fun_str);
    }