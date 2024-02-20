function vary(prop) {
      let b = a.clone();
      assert.equal(subject(a, b), 0);
      b[prop] += 1;
      assert.equal(subject(a, b), -1);
      b[prop] -= 2;
      assert.equal(subject(a, b), 1);
    }