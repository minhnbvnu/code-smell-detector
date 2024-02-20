function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
          var milliseconds = duration._milliseconds,
              days = duration._days,
              months = duration._months;
          updateOffset = updateOffset == null ? true : updateOffset;

          if (milliseconds) {
              mom._d.setTime(+mom._d + milliseconds * isAdding);
          }
          if (days) {
              get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
          }
          if (months) {
              setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
          }
          if (updateOffset) {
              utils_hooks__hooks.updateOffset(mom, days || months);
          }
      }