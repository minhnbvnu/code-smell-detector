function CStruct(members, names, struct_name)
    {
        var l;
        var mem;
        var i = 0;
        var type_size = 0;
        var struct_size = 0;
        var s;
        var d;

        // Sometimes the FFI user doesn't care about the layout of the struct, in that case
        // they can just specify the tag: such as 'struct Foo'. These cannot be fully wrapped,
        // but usually when you do this it's because you are just passing around an opaque pointer.
        if (members === null || members === undefined)
            return { wrapper: 'CStruct', name: 's{}' };

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
                    'Invalid type size for: ' + mem.name + ' in struct ' +
                    (struct_name ? struct_name : '')
                );
            }

            struct_size += type_size;
            d = struct_size % type_size;
            if (d !== 0)
                struct_size += type_size - d;
            i += 1;
        }

        if (typeof struct_size !== 'number' || isNaN(struct_size))
        {
            throw new FFIError('Invalid type size for: struct ' + (struct_name ? struct_name : ''));
        }

        s = {
            wrapper : 'CStruct',
            members : members,
            name : (struct_name || 's{}'),
            size : struct_size,
            wrapper_fun : CStructGen(members, names, struct_size)
        };

        return s;
    }