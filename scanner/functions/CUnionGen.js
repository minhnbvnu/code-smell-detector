function CUnionGen(members, names, size)
    {
        var i = 0;
        var l = members.length;
        var mem;
        var type_size;
        var loader;
        var loaders;
        var loader_n = 0;
        var loader_args = [];
        var loader_gens = [];

        var wrapper_fun =
           `(function(c)
            {
                var strProto = {};`;

        while (i < l)
        {
            mem = members[i];
            type_size = mem.align_size || mem.size;

            if (typeof type_size !== 'number' || isNaN(type_size))
            {
                throw new FFIError('Invalid type size for: ' + mem.name);
            }

            // members with a simple type like int are handled differently than members
            // of type like char[], the former uses simple getters/setters
            // the latter use a wrapper
            loader = mem.load_fun;

            if (!loader)
            {
                // This member uses a wrapper
                loaders = loaders || [];
                loader_n += 1;
                loader_args.push('ld' + loader_n);
                loaders.push(mem.wrapper_fun);
                loader_gens.push(`\
                    s.` + names[i] + ` = ld` +
                        loader_n + `(s.ptr, s.offset);`);
            }
            else
            {
                // This member uses simple getter/setter
                wrapper_fun +=
                   `strProto.get_` + names[i] + ` = function ()
                    {
                        return ` + loader + `(this.ptr, this.offset);
                    };
                    strProto.set_` + names[i] + ` = function (val)
                    {
                        return ` + mem.store_fun + `(this.ptr, this.offset, val);
                    };`;
            }

            // setup for next member
            i += 1;
        }

        // constructor function
        wrapper_fun +=
               `return (function(ptr, offset)
                {
                    var s = Object.create(strProto);
                    if ($ir_is_rawptr(ptr))
                    {
                       s.ptr = ptr;
                       s.offset = offset || 0;
                    }
                    else
                    {
                      s.ptr = c.malloc(` + size + `);
                      s.offset = offset || 0;
                  }\n` + loader_gens.join('\n') +
                   `
                    return s;
                });
            })
        `;

        if (loader_n > 0)
        {
            // If any of the members use wrappers, add access to the wrapping functions
            wrapper_fun =
                `(function(` + loader_args.join(', ') + `)
                 {
                     return ` + wrapper_fun + `
                 })
                `;
            return eval(wrapper_fun).apply(this, loaders)(c);
        }
        else
        {
            // ...otherwise just return the wrapping function
            return eval(wrapper_fun)(c);
        }
    }