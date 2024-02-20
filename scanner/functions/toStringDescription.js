function toStringDescription(obj)
{
    if (obj === 0 && 1 / obj < 0)
        return "-0";

    return toString(obj);
}