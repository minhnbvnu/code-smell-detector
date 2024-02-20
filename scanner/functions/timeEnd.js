function timeEnd(timer)
    {
        var timer_name = timer || '*unnamed timer*';
        var start_time = timers[timer_name];
        if (start_time === undefined)
            throw 'Invalid timer name for timeEnd: ' + timer_name;

        print(timer_name + ':\t' + ($ir_get_time_ms() - start_time));
        timers[timer_name] = undefined;
    }