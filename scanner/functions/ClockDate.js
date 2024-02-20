function ClockDate(year, month, date, hour, minute, second, ms) {
        // Defensive and verbose to avoid potential harm in passing
        // explicit undefined when user does not pass argument
        switch (arguments.length) {
          case 0:
            return new NativeDate(ClockDate.clock.now);
          case 1:
            return new NativeDate(year);
          case 2:
            return new NativeDate(year, month);
          case 3:
            return new NativeDate(year, month, date);
          case 4:
            return new NativeDate(year, month, date, hour);
          case 5:
            return new NativeDate(year, month, date, hour, minute);
          case 6:
            return new NativeDate(year, month, date, hour, minute, second);
          default:
            return new NativeDate(year, month, date, hour, minute, second, ms);
        }
      }