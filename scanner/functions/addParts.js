function addParts(val, delim, block, info, escapeIt)
{
    var vals = [];
    if (val instanceof Parts)
    {
        for (var i = 0; i < val.parts.length; ++i)
        {
            var part = val.parts[i];
            if (part instanceof Variable)
            {
                var partName = part.name;
                if (part.format)
                {
                    for (var j = 0; j < part.format.length; ++j)
                        partName = part.format[j] + "(" + partName + ")";
                }

                if (escapeIt)
                    vals.push("__escape__(" + partName + ")");
                else
                    vals.push(partName);
            }
            else
                vals.push('"'+ part + '"');
        }
    }
    else if (isTag(val))
    {
        info.args.push(val);
        vals.push('s'+info.argIndex++);
    }
    else
        vals.push('"'+ val + '"');

    var parts = vals.join(delim);
    if (parts)
        block.push(delim, parts);
}