function CFun(ret, args)
    {
        var next = null;
        var key = 0;
        var l = args.length;
        var key_name = ret.name;
        var f;
        var last = CFuns[key_name];

        // Check for existing wrapper
        if (!last)
        {
            last = CFuns[key_name] = Object.create(null);
            if (args.length === 0)
                last = last['void'] = Object.create(null);
            else
                while (key < l)
                    last = last[args[key++].name] = Object.create(null);
        }
        else
        {
            while (key < l)
            {
                key_name = args[key++].name;
                next = last[key_name];
                if (!next)
                    last = last[key_name] = Object.create(null);
                else
                    last = next;
            }
        }

        f = last.$;

        // Otherwise, create a new one
        if (!f)
        {
            f = {
                wrapper : 'CFun',
                args : args,
                ret : ret,
                name : FunNameStr(ret, args),
                wrapper_fun : CFunGen(ret, args)
            };

            last.$ = f;
        }

        return f;
    }