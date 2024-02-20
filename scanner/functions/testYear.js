function testYear(start) {
      let end = new Date(
        start.getFullYear() + 1,
        start.getMonth(),
        start.getDate()
      );

      let max = 400;
      let cur = start;
      inc = 1;
      let time = Time.fromJSDate(cur);

      end = new Date(
        end.getFullYear(),
        end.getMonth(),
        0
      );

      while (end.valueOf() >= cur.valueOf()) {
        if (inc > max) {
          throw new Error('test error inf loop');
        }

        assert.equal(
          time.dayOfYear(),
          inc,
          cur.toString()
        );

        cur = new Date(
          start.getFullYear(),
          0,
          start.getDate() + inc
        );
        time = Time.fromJSDate(cur);
        inc++;
      }
    }