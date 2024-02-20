function getArgString(len)
    {
        if (arg_strings[len] !== undefined)
            return arg_strings[len];

        var arg_string = 'a';
        for (var i = 1; i < len; i++)
            arg_string += ', ' + arg_names[i];
        arg_string += ' ';
        arg_strings[len] = arg_string;
        return arg_string;
    }