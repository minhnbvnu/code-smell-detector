function onAfterUpdate(resource, attrs) {
      try {
        assert.deepEqual(angular.toJson(attrs), angular.toJson(testComment2));
        assert.isFalse(testComment2 === attrs);
      } catch (e) {
        console.log(e.stack);
      }
    }