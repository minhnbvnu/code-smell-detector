function assertOrder(har, propertyName, expectedIds) {
    var model = new HarModel();
    var input2 = model.append(har);
    var ids = input2.log[propertyName].map(function(it) {
      return it.id;
    });
    // check the order
    assert.deepEqual(ids, expectedIds);
}