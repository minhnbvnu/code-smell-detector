function cb1(e) {
      called1++;
      expect(e.type).toBe('change');
    }