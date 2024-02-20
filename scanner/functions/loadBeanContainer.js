function loadBeanContainer(loader) {
  loader.app.bean = beanContainerFn(loader.app, null);
}