function onBeforeUpdate(resource, attrs) {
      try {
        attrs.other = 'stuff';
        assert.equal(angular.toJson(attrs), angular.toJson({ content: 'stuff', other: 'stuff' }));
      } catch (e) {
        console.log(e.stack);
      }
    }