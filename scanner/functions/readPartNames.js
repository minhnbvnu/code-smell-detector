function readPartNames(val, vars)
{
    if (val instanceof Parts)
    {
        for (var i = 0; i < val.parts.length; ++i)
        {
            var part = val.parts[i];
            if (part instanceof Variable)
                vars.push(part.name);
        }
    }
}