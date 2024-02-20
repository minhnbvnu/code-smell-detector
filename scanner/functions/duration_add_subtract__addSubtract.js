function duration_add_subtract__addSubtract (duration, input, value, direction) {
          var other = create__createDuration(input, value);

          duration._milliseconds += direction * other._milliseconds;
          duration._days         += direction * other._days;
          duration._months       += direction * other._months;

          return duration._bubble();
      }