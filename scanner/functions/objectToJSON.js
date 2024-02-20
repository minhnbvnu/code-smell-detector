function objectToJSON (
        o,
        depth
    )
    {
        if (o === null)
            return 'null';

        var keys;

        if (propertyList === undefined)
            keys = Object.keys(o);
        else
            keys = propertyList;

        if (keys.length === 0)
            return "{}";

        var parts = [];

        if (espace === undefined)
        {
            parts.push("{");

            for (var i = 0; i < keys.length; ++i)
            {
                var strp = toJSON(keys[i], o, depth + 1);

                if (strp !== undefined)
                {
                    parts.push(quote(keys[i]));        
                    parts.push(":");
                    parts.push(strp);
                    parts.push(",");
                }
            }

            if (parts.length > 1)
                parts.pop();
            parts.push("}");
        }
        else
        {
            parts.push("{\n");

            for (var i = 0; i < keys.length; ++i)
            {
                var strp = toJSON(keys[i], o, depth + 1);

                if (strp !== undefined)
                {
                    for (var j = 0; j < depth; ++j)
                        parts.push(espace);

                    parts.push(quote(keys[i]));        
                    parts.push(": ");
                    parts.push(strp);
                    parts.push(",\n");
                }
            }

            if (parts.length > 1)
                parts.pop();

            parts.push("\n");
            for (var j = 0; j < depth - 1; ++j)
                parts.push(espace);
            parts.push("}");
        }

        return parts.join("");
    }