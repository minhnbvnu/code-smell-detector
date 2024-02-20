function exceptionTime(index, mod) {
        mod = mod || 0;


        let item = subject.rangeExceptions[index];
        let utc = item[0];
        let time = new ICAL.Time();
        time.fromUnixTime(utc + mod);

        return time;
      }