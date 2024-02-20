function updateObject(instance, data) {
  if (instance.isSeempleArray) {
    instance.recreate(data);
  } else if (instance.isSeempleObject) {
    // QUESTION: Is it OK to just extend but not replace instance data?
    instance.setData(data);
  } else {
    forOwn(data, (value, key) => {
      instance[key] = value;
    });
  }

  return instance;
}