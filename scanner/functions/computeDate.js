function computeDate ()
{
    var value = this.__value__;

    this.__wd__ = ((Math.floor(value / MS_PER_DAY)) + 3) % 7;

    value = yearFromTime.call(this, value);

    value = monthAndDayFromTime.call(this, value, InLeapYear(this.__yr__));

    this.__h__ = Math.floor(value / MS_PER_HOUR);
    value -= this.__h__ * MS_PER_HOUR;

    this.__min__ = Math.floor(value / MS_PER_MINUTE);
    value -= this.__min__ * MS_PER_MINUTE;

    this.__s__ = Math.floor(value / MS_PER_SECOND);
    value -= this.__s__ * MS_PER_SECOND;

    this.__milli__ = value;
}