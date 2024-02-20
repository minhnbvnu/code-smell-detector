function daysPerYear(ref) {
      var a = ref.getTime();

      // increment year by 1
      var b = new Date(a);
      b.setFullYear(ref.getFullYear() + 1);

      // this is the trickiest since years (periodically) vary in length
      return Math.round((b.getTime() - a) / MILLISECONDS_PER_DAY);
    }