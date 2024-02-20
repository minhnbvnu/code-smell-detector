function offsetMatches(matches, offset)
        {
            for (var j = 0; j < matches.length; j++)
                matches[j].index += offset;
        }