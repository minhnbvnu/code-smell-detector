function appendObject(object, html)
    {
        try
        {
            if (object == undefined)
                appendNull("undefined", html);
            else if (object == null)
                appendNull("null", html);
            else if (typeof object == "string")
                appendString(object, html);
            else if (typeof object == "number")
                appendInteger(object, html);
            else if (typeof object == "function")
                appendFunction(object, html);
            else if (object.nodeType == 1)
                appendSelector(object, html);
            else if (typeof object == "object")
                appendObjectFormatted(object, html);
            else
                appendText(object, html);
        }
        catch (exc)
        {
        }
    }