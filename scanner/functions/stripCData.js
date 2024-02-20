function stripCData(original)
    {
        var left = '<![CDATA[',
            right = ']]>',
        // for some reason IE inserts some leading blanks here
            copy = trim(original),
            changed = false,
            leftLength = left.length,
            rightLength = right.length
            ;

        if (copy.indexOf(left) == 0)
        {
            copy = copy.substring(leftLength);
            changed = true;
        }

        var copyLength = copy.length;

        if (copy.indexOf(right) == copyLength - rightLength)
        {
            copy = copy.substring(0, copyLength - rightLength);
            changed = true;
        }

        return changed ? copy : original;
    }