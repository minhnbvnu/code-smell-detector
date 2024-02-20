function testProperty(prop, changeval) {
      test('#' + prop, function() {
        let expected = primaryItem.getFirstPropertyValue(prop);
        assert.deepEqual(subject[prop], expected);

        subject[prop] = changeval;
        assert.equal(primaryItem.getFirstPropertyValue(prop), changeval);
      });
    }