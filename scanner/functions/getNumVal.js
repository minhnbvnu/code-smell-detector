function getNumVal(num)
{
    if (num instanceof Number)
        return num.value;

    return num;
}