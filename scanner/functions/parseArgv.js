function parseArgv(argv)
    {
        var arguments = [];
        var options = {};
        for (var i = 0; i < argv.length; i++)
        {
            var arg = argv[i];
            if (/^--?/.test(arg))
            {
                parseOption(arg, options);
            }
            else
            {
                arguments.push(arg);
            }
        }
        return {args: arguments, opts: options};
    }