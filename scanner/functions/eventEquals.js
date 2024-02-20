function eventEquals(a, b, msg) {
      if (!a)
        throw new Error('actual is falsy');

      if (!b)
        throw new Error('expected is falsy');

      if (a instanceof ICAL.Event) {
        a = a.component;
      }

      if (b instanceof ICAL.Event) {
        b = b.component;
      }

      assert.deepEqual(a.toJSON(), b.toJSON(), msg);
    }