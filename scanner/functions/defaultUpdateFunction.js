function defaultUpdateFunction(instance, data) {
  if (instance.isSeempleArray) {
    instance.recreate(data);
  } else if (instance.isSeempleObject) {
    instance.setData(data, { replaceData: true });
  } else {
    // for other objects just extend them with given data
    assign(instance, data);
  }
}