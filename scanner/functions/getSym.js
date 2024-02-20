function getSym(lib, name)
    {
        return eval(`
                    function(lib)
                    {
                        return $ir_get_sym(lib, '` + name + `');
                    };
               `)(lib.ptr);
    }