function parseOption(arg, options)
    {
        // long option regex
        var matches = arg.match(/^--([a-z0-9_\-]+)(?:=(.+))?$/i);
        if (matches !== null)
        {
            options[matches[1]] = matches[2] || true;
        }
        else
        {
            // short option regex
            matches = arg.match(/^-([a-z]+)(?:=(.+))?$/i);
            // check if parameter is valid
            if (matches !== null)
            {
                // split the options -abc = {a:true,b:true,c:true}
                for (var i = 1; i < arg.length; i++)
                    options[arg[i]] = true;
                // if there's a value, give it to the last option
                // -abc=qwerty {a:true,b:true,c:'qwerty'}
                if (matches[2] != null)
                {
                    var opt = matches[1].slice(-1);
                    options[opt] = matches[2];
                }
            } else {
                throw new Error('Invalid option: ' + arg);
            }
        }
    }