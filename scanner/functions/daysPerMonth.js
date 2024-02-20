function daysPerMonth(ref) {
      var a = ref.getTime();

      // increment month by 1
      var b = new Date(a);
      b.setMonth(ref.getMonth() + 1);

      // this is the trickiest since months vary in length
      return Math.round((b.getTime() - a) / MILLISECONDS_PER_DAY);
    }