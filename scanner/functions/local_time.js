function local_time(args) {
    
    let d;
    if (args === undefined) {
        d = new Date();
    } else if (typeof args === 'string') {
        d = new Date(args);
    } else {
        d = new Date(args.year, args.month, args.day,
                     args.hour || 0, args.minute || 0, args.second || 0,
                     args.millisecond || 0);

        // Modify the date to adjust for the timezone
        d = new Date(d.getTime() + (new Date().getTimezoneOffset() - args.timezone) * 60000);
    }
    
    return {
        year:        d.getFullYear(),
        month:       d.getMonth(),
        day:         d.getDate(),
        hour:        d.getHours(),
        minute:      d.getMinutes(),
        second:      d.getSeconds(),
        millisecond: d.getMilliseconds(),
        weekday:     d.getDay(),
        day_second:  (d.getHours() * 60 + d.getMinutes()) * 60 + d.getSeconds() + d.getMilliseconds() * 0.001,
        timezone:    d.getTimezoneOffset(),
        absolute_milliseconds: d.getTime()
    };
}