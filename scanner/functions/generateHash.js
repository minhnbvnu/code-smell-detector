function generateHash(name) {
      // Return a vector (0.0->1.0) that is a hash of the input string.
      // The hash is computed to favor early characters over later ones, so
      // that strings with similar starts have similar vectors. Only the first
      // 6 characters are considered.
      var hash = 0, weight = 1, max_hash = 0, mod = 10, max_char = 6;
      if (name) {
        for (var i = 0; i < name.length; i++) {
          if (i > max_char) { break; }
          hash += weight * (name.charCodeAt(i) % mod);
          max_hash += weight * (mod - 1);
          weight *= 0.70;
        }
        if (max_hash > 0) { hash = hash / max_hash; }
      }
      return hash;
    }