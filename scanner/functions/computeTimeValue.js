function computeTimeValue ()
{
    this.__value__ = MakeDay(this.__yr__, this.__m__, this.__dt__) * MS_PER_DAY +
        MakeTime(this.__h__, this.__min__, this.__s__, this.__milli__);
}