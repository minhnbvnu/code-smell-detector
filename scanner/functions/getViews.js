function getViews(viewMode, options = {}) {
  const {name, orthographic, firstPerson, mapInteraction} = viewMode;

  const controllerProps = {...mapInteraction, keyboard: false};

  if (firstPerson) {
    return new FirstPersonView({
      ...options,
      id: name,
      fovy: 75,
      near: 1,
      far: 10000,
      focalDistance: 6,
      controller: controllerProps
    });
  }

  return new MapView({
    ...options,
    id: name,
    orthographic,
    controller: controllerProps
  });
}