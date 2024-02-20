function yearFromTime (
    t
)
{
    var year = 2000;
    var side, offset, step;

    // Compute the offset between the time value and the first day of 2000.
    if (t < TIME_YEAR_2000)
    {
        side = -1;
        offset = TIME_YEAR_2000 - t;
    }
    else
    {
        side = 1;
        offset = t - TIME_YEAR_2000;
    }

    // Step of 400 years chunk.
    step = Math.floor(offset / (DAYS_PER_400YEARS * MS_PER_DAY));
    year += side * 400 * step;
    offset -= step * DAYS_PER_400YEARS * MS_PER_DAY;

    // Step of 100 years chunk.
    step = Math.floor(offset / (DAYS_PER_100YEARS * MS_PER_DAY));
    year += side * 100 * step;
    offset -= step * DAYS_PER_100YEARS * MS_PER_DAY;

    // Step of 4 years chunk.
    step = Math.floor(offset / (DAYS_PER_4YEARS * MS_PER_DAY));
    year += side * 4 * step;
    offset -= step * DAYS_PER_4YEARS * MS_PER_DAY;

    // Compute the year within the 4 years chunk.
    if (offset > 0)
    {
        if (side > 0)
        {
            if ((offset - 366 * MS_PER_DAY) < 0)
            {
                this.__yr__ = year;
                return offset;
            }
            else
            {
                offset -= 366 * MS_PER_DAY;
                step = Math.floor(offset / (365 * MS_PER_DAY));
                offset -= step * 365 * MS_PER_DAY;
                this.__yr__ = year + step + 1;
                return offset;
            }
        }
        else
        {
            step = Math.floor(offset / (365 * MS_PER_DAY));
            offset -= step * 365 * MS_PER_DAY;
            this.__yr__ = year - (step > 3 ? 3 : step) - (offset > 0 ? 1 : 0);
            return offset;
        }
    }
    this.__yr__ = year;

    return offset;
}