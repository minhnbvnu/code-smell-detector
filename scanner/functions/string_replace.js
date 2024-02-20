function string_replace(searchValue, replaceValue)
{
    if (typeof searchValue === "string")
    {
        var pos = this.indexOf(searchValue);

        if (pos === -1)
            return this;

        if (typeof replaceValue === "function")
        {
            var ret = replaceValue(searchValue, pos, this.toString());

            return this.substring(0, pos).concat(
                $rt_toString(ret),
                this.substring(pos + $rt_str_get_len(searchValue))
            );
        }
        else
        {
            return (
                this.substring(0, pos) +
                $rt_toString(replaceValue) +
                this.substring(pos + $rt_str_get_len(searchValue))
            );
        }
    }
    else if (searchValue instanceof $rt_RegExp)
    {
        // Save regexp state
        var globalFlagSave = searchValue.global;
        var lastIndexSave = searchValue.lastIndex;

        // Set the regexp global to get matches' index
        searchValue.global = true;
        searchValue.lastIndex = 0;

        // Current and previous regexp matches
        var previousMatch;
        var match;

        // Will hold new string parts
        var nsparts = [];
        var nslen = 0;
        var i = 0;

        do
        {
            // Execute regexp
            match = searchValue.exec(this);

            // Stop if no match left
            if (match === null)
                break;

            // Stop if we matched an empty string twice in a row (15.10.2.5 NOTE4)
            if (previousMatch && match[0].length === 0 && previousMatch[0].length === 0)
                break;

            // Get the last match index
            var matchIndex = searchValue.lastIndex - match[0].length;

            if (typeof replaceValue === "function")
            {
                if (i < matchIndex)
                    nsparts.push(this.substring(i, matchIndex));

                // Compose the arguments array with the match array
                match.push(matchIndex);
                match.push(this.toString());

                var ret = replaceValue.apply(null, match);
                nsparts.push(new String(ret).toString());
            }
            else
            {
                // Expand replaceValue
                var rvparts = [];
                var j = 0, k = 0;

                // Get the string representation of the object
                replaceValue = replaceValue.toString();

                for (; j < replaceValue.length; ++j)
                {
                    // Expand special $ form
                    if (replaceValue.charCodeAt(j) === 36) // '$'
                    {
                        if (k < j)
                            rvparts.push(replaceValue.substring(k, j));

                        var c = replaceValue.charCodeAt(j + 1);

                        if (c === 36) // '$'
                        {
                            ++j;
                            rvparts.push("$");
                        }
                        else if (c === 38) // '&'
                        {
                            ++j;
                            rvparts.push(match[0]);
                        }
                        else if (c === 96) // '`'
                        {
                            ++j;
                            rvparts.push(this.substring(0, matchIndex));
                        }
                        else if (c === 39) // '''
                        {
                            ++j;
                            rvparts.push(this.substring(searchValue.lastIndex));
                        }
                        else if (c >= 48 && c <= 57)
                        {
                            ++j;

                            var n = 0;
                            var cn = replaceValue.charCodeAt(j + 1);
                            if (cn >= 48 && cn <= 57)
                            {
                                n = (cn - 48) * 10;
                                ++j;
                            }
                            n += c - 48;

                            // Push submatch if index is valid, or the raw string if not
                            if (n < match.length)
                                rvparts.push(match[n]);
                            else
                                rvparts.push("$" + n);
                        }
                        else
                        {
                            rvparts.push("$");
                        }

                        k = j + 1;
                    }
                }

                if (k === 0)
                {
                    if (i < matchIndex)
                        nsparts.push(this.substring(i, matchIndex));

                    // Not expansion occured : push raw replaceValue.
                    if (replaceValue.length > 0)
                        nsparts.push(replaceValue);
                }
                else
                {
                    // Get the last not expanded part of replaceValue.
                    if (k < replaceValue.length - 1)
                        rvparts.push(replaceValue.substring(k, replaceValue.length));

                    if (i < matchIndex)
                        nsparts.push(this.substring(i, matchIndex));

                    var expandedrv = rvparts.join("");

                    if (expandedrv.length > 0)
                        nsparts.push(expandedrv);
                }
            }

            i = searchValue.lastIndex;

            previousMatch = match;

        } while (globalFlagSave);

        if (i < this.length)
            nsparts.push(this.substring(i, this.length));

        searchValue.global = globalFlagSave;
        searchValue.lastIndex = lastIndexSave;

        return nsparts.join("");
    }

    return this.toString();
}