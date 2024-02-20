function randArg()
    {
        if ($argc === 0)
            throw TypeError("no arguments passed");

        var idx = randIndex($argc);

        return $ir_get_arg(idx);
    }