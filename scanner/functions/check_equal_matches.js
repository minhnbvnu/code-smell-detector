function check_equal_matches(a, b)
{
    if (b instanceof Array)
    {
        if (a instanceof Array)
        {
            if (a.length !== b.length)
                return false;

            for (var i = 0; i < a.length; ++i)
                if (a[i] !== b[i])
                    return false;
        }
        else
        {
            return false;
        }
    }
    else
    {
        if (a !== b)
            return false;
    }
    return true;
}