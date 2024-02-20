function handleDecs(lib, dlist, ctypes)
    {
        var i = 0;
        var l = dlist.length;
        var dec;
        var ptr;
        var dec_type;
        var dec_name;
 
        do
        {
            dec = dlist[i];

            if (!dec.type)
                throw new FFIError('Missing type in declaration: ' + (dec.name ? dec.name : ''));

            dec_type = dec.type.wrapper;
            dec_name = dec.name;

            if (dec.storage_class === 'typedef')
            {
                ctypes[dec_name] = dec.type;
                lib[dec_name] = dec.type.wrapper_fun;
            }
            else if (dec_name && dec_type === 'CFun')
            {
                ptr = getSym(lib, dec.name);
                lib[dec_name] = dec.type.wrapper_fun(ptr);
            }
            else if (dec_name && dec_type === 'CArray')
            {
                ptr = getSym(lib, dec_name);
                lib[dec_name] = dec.type.wrapper_fun(ptr);
            }
            else if (dec_name && (dec_type === 'CStruct' || dec_type === 'CUnion'))
            {
                ptr = getSym(lib, dec.name);
                lib[dec.name] = dec.type.wrapper_fun(ptr);
            }
            else if (dec_name)
            {
                ptr = getSym(lib, dec_name);
                lib['get_' + dec_name] =
                    eval(`
                         function(ptr)
                         {
                             return function()
                             {
                                 return ` + dec.type.load_fun + `(ptr, 0);
                             }
                         }
                    `)(ptr);

                lib['set_' + dec_name] =
                    eval(`
                         function(ptr)
                         {
                             return function(val)
                             {
                                 return ` + dec.type.store_fun + `(ptr, 0, val);
                             }
                         }
                    `)(ptr);
            }
        } while (++i < l);

        // clear array
        dlist.length = 0;
    }