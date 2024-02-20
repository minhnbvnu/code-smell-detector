function arrayToJSON (
        a,
        depth
    )
    {
        var parts = [];

        if (a.length === 0)
            return "[]";

        if (espace === undefined)
        {
            parts.push("[");

            for (var i = 0; i < a.length; ++i)
            {
                var strp = toJSON(i.toString(), a, depth + 1);

                parts.push(strp);
                parts.push(",");
            }

            if (a.length > 0)
                parts.pop();

            parts.push("]");
        }
        else
        {
            parts.push("[\n");

            for (var i = 0; i < a.length; ++i)
            {
                var strp = toJSON(i.toString(), a, depth + 1);

                for (var j = 0; j < depth; ++j)
                    parts.push(espace);
                parts.push(strp);
                parts.push(",\n");
            }

            if (a.length > 0)
                parts.pop();

            parts.push("\n");
            for (var j = 0; j < depth - 1; ++j)
                parts.push(espace);
            parts.push("]");
        }

        return parts.join("");
    }