function MakeDay (
    year,
    month,
    date
)
{
    return DayFromYear(year) + DayFromMonth(month, InLeapYear(year)) + date - 1;
}