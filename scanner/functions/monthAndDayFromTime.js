function monthAndDayFromTime (
    t,
    inLeapYear
)
{
    var day = Math.floor(t / MS_PER_DAY);
    var dayInMonth;
    var month;

    if (0 <= day && day < 31)
    {
        month = 0;
        dayInMonth = day;
    }
    else if (31 <= day && day < 59 + inLeapYear)
    {
        month = 1;
        dayInMonth = day - 31;
    }
    else if (59 + inLeapYear <= day && day < 90 + inLeapYear)
    {
        month = 2;
        dayInMonth = day - 59 + inLeapYear;
    }
    else if (90 + inLeapYear <= day && day < 120 + inLeapYear)
    {
        month = 3;
        dayInMonth = day - 90 + inLeapYear;
    }
    else if (120 + inLeapYear <= day && day < 151 + inLeapYear)
    {
        month = 4;
        dayInMonth = day - 120 + inLeapYear;
    }
    else if (151 + inLeapYear <= day && day < 181 + inLeapYear)
    {
        month = 5;
        dayInMonth = day - 151 + inLeapYear;
    }
    else if (181 + inLeapYear <= day && day < 212 + inLeapYear)
    {
        month = 6;
        dayInMonth = day - 181 + inLeapYear;
    }
    else if (212 + inLeapYear <= day && day < 243 + inLeapYear)
    {
        month = 7;
        dayInMonth = day - 212 + inLeapYear;
    }
    else if (243 + inLeapYear <= day && day < 273 + inLeapYear)
    {
        month = 8;
        dayInMonth = day - 243 + inLeapYear;
    }
    else if (273 + inLeapYear <= day && day < 304 + inLeapYear)
    {
        month = 9;
        dayInMonth = day - 273 + inLeapYear;
    }
    else if (304 + inLeapYear <= day && day < 334 + inLeapYear)
    {
        month = 10;
        dayInMonth = day - 304 + inLeapYear;
    }
    else if (334 + inLeapYear <= day && day < 365 + inLeapYear)
    {
        month = 11;
        dayInMonth = day - 334 + inLeapYear;
    }

    this.__dt__ = dayInMonth + 1;
    this.__m__ = month;

    return t - (day * MS_PER_DAY);
}