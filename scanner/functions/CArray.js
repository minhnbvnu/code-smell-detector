function CArray(of, length)
    {
        var name = of.name;
        var a = CArrays[name];
        var t;

        length = length || 0;

        // check for existing wrapper
        if (!a)
            a = CArrays[name] = Object.create(null);

        t = a[length];

        // otherwise create a new wrapper
        if (t === undefined)
        {
            t = {
                of : of,
                name : '[' + name + ']',
                length : length,
                wrapper : 'CArray',
                size : of.size * length,
                align_size : of.size,
                wrapper_fun : CArrayGen(of, length)
            };

            a[length] = t;
        }

        return t;
    }