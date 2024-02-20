function MakeTime (
    hour,
    min,
    sec,
    ms
)
{
    return hour * MS_PER_HOUR + min * MS_PER_MINUTE + sec * MS_PER_SECOND + ms;
}