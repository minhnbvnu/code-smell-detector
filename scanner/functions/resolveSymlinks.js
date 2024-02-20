function resolveSymlinks(file) {
      expect(file).toEqual(expect.anything());
      expect(file.stat).toEqual(expect.anything());
      expect(file.stat.isSymbolicLink()).toEqual(true);

      return true;
    }