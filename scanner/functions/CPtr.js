function CPtr(to)
    {
        var name = to.name;
        var p = CPtrs[name];

        if (!p)
        {
            p = {
                wrapper : 'CPtr',
                to : to,
                base_type : '*',
                name : '*' + name,
                size : 8,
                load_fun : '$ir_load_rawptr',
                store_fun : '$ir_store_rawptr'
            };

            CPtrs[name] = p;
        }

        return p;
    }