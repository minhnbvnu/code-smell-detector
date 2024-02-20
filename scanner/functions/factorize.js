function factorize(num) {
      var factors = {};
      var n = num;
      var i = 2;
      var s = 4;

      while (s <= n) {
        while (n % i === 0) {
          n /= i;
          factors[i] = (factors[i] || 0) + 1;
        }

        s += 1 + 2 * i++;
      }

      if (n !== num) {
        if (n > 1) factors[n] = (factors[n] || 0) + 1;
      } else {
        factors[num] = (factors[num] || 0) + 1;
      }

      return factors;
    }