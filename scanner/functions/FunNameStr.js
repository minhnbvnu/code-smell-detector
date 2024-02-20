function FunNameStr(ret, args)
    {
        var i = 0;
        var l = args.length - 1;
        var str = '(' + ret.name + ',';

        if (args.length === 0)
            return str + 'void)';
        else
            while (i <= l)
            {
                str += args[i].name;
                if (i < l)
                    str += ',';
                i += 1;
            }

        return str + ')';
    }