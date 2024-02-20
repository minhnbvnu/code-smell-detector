function evalCommandLine()
    {
        var text = commandLine.value;
        commandLine.value = "";

        logRow([clPrefix, text], "command");
        
        var value;
        try
        {
            value = eval(text);
        }
        catch (exc)
        {
        }

        console.log(value);
    }