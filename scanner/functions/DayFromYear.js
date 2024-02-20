function DayFromYear (
    y
)
{
    return 365 * (y - 1970) +
        Math.floor(((y - 1969) / 4)) -
        Math.floor(((y - 1901)/100)) +
        Math.floor(((y - 1601)/400));
}