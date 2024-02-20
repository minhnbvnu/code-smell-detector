function array_sort_comparefn_default(x, y)
{
    if (String(x) > String(y))
        return 1;
    else
        return -1;
}