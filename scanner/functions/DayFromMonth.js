function DayFromMonth (
    m,
    inLeapYear
)
{
    switch (m)
    {
    case 0:
        return 0;

    case 1:
        return 31;

    case 2:
        return 59 + inLeapYear;

    case 3:
        return 90 + inLeapYear;

    case 4:
        return 120 + inLeapYear;

    case 5:
        return 151 + inLeapYear;

    case 6:
        return 181 + inLeapYear;

    case 7:
        return 212 + inLeapYear;

    case 8:
        return 243 + inLeapYear;

    case 9:
        return 273 + inLeapYear;

    case 10:
        return 304 + inLeapYear;

    case 11:
        return 334 + inLeapYear;
    }
}