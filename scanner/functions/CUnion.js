function CUnion(members, names, union_name)
    {
        var l;
        var mem;
        var i = 0;
        var type_size = 0;
        var union_size = 0;
        var u;

        // Sometimes the FFI user doesn't care about the layout of the union, in that case
        // they can just specify the tag: such as 'union Foo'. These cannot be fully wrapped,
        // but usually when you do this it's because you are just passing around an opaque pointer.
        if (members === null || members === undefined)
            return { wrapper: 'CUnion', name: 'u{}' };

        // Otherwise, get a full type wrapper

        // calculate size of struct
        l = members.length;
        while (i < l)
        {
            mem = members[i];
            type_size = mem.size;

            if (typeof type_size !== 'number' || isNaN(type_size))
            {
                throw new FFIError(
                    'Invalid type size for: ' + mem.name + ' in union ' +
                    (union_name ? union_name : '')
                );
            }

            if (type_size > union_size)
                union_size = type_size;
            i += 1;
        }

        u = {
            wrapper : 'CUnion',
            members : members,
            name : (union_name || 'u{}'),
            size : union_size,
            wrapper_fun : CUnionGen(members, names, union_size)
        };

        return u;
    }