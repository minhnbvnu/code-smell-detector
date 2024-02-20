function treeEq(a, b)
{
    if (a instanceof Array && b instanceof Array)
    {
        if (a.length !== b.length)
            return false;

        for (let i = 0; i < a.length; ++i)
        {
            if (!treeEq(a[i], b[i]))
                return false;
        }

        return true;
    }

    if (a instanceof Object && b instanceof Object)
    {
        // Compare all entries
        for (let k in a)
        {
            if (!(k in b))
                return false;

            if (!treeEq(a[k], b[k]))
                return false;
        }

        // a and b must have the same keys
        for (let k in b)
        {
            if (!(k in a))
                return false;
        }

        return true;
    }

    return a === b;
}