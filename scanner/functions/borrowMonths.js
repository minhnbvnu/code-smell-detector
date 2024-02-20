function borrowMonths(ref, shift) {
      var prevTime = ref.getTime();

      // increment month by shift
      ref.setMonth(ref.getMonth() + shift);

      // this is the trickiest since months vary in length
      return Math.round((ref.getTime() - prevTime) / MILLISECONDS_PER_DAY);
    }