function checkOrder (objects, array) {
      array.forEach((item, index) => {
        assert.equal(objects[index].name, item);
      });
    }