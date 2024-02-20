function customOverride(filePath, time, include) {
        assert.equal(filePath, 'src/js/a.js');
        assert.equal(time.getTime(), 150);
        include(true);
      }