function DaysInYear (
    y
)
{
    if (y % 4 !== 0)
        return 365;
    if (y % 100 !== 0)
        return 366;
    if (y % 400 !== 0)
        return 365;
    return 366;
}