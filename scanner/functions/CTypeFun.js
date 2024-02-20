function CTypeFun(ob)
    {
        var CTypes = ob || Object.create(null);

        return function(name, base_type, size, load_fun, store_fun, wrapper_fun)
        {
            var t = CTypes[name];

            if (!t)
            {
                if (arguments.length < 3)
                {
                    throw new CParseError('Invalid or unspecified type: ' + name);
                }

                t = {
                    wrapper : 'CType',
                    name : name,
                    base_type : base_type,
                    size : size,
                    load_fun : load_fun,
                    store_fun : store_fun,
                    wrapper_fun : wrapper_fun || null
                };

                CTypes[name] = t;
            }
            return t;
        };
    }