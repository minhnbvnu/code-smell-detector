function observeObjects(objects, timestamp) {
  if (objects) {
    objects.features.forEach(f => {
      XVIZObject.observe(f.id, timestamp);
    });
  }
}