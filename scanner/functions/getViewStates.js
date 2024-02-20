function getViewStates({viewState, trackedPosition, viewMode, offset}) {
  const {name, firstPerson, tracked = {}} = viewMode;

  const viewStates = {};

  if (firstPerson) {
    if (trackedPosition) {
      const bearing = trackedPosition.bearing;
      viewState = {
        ...viewState,
        ...firstPerson,
        longitude: trackedPosition.longitude,
        latitude: trackedPosition.latitude,
        bearing: bearing + offset.bearing
      };

      // Put the tracked object on the ground + 1.3 for vehicle height
      // TODO - support flying vehicle
      viewState.position = [0, 0, trackedPosition.altitude + 1.3];
    }

    viewStates[name] = viewState;
  } else {
    viewState = {...viewState, transitionDuration: 0};
    offset = {...offset};

    // Track car position & heading
    if (tracked.position && trackedPosition) {
      viewState.longitude = trackedPosition.longitude;
      viewState.latitude = trackedPosition.latitude;
    } else {
      offset.x = 0;
      offset.y = 0;
    }
    if (tracked.heading && trackedPosition) {
      viewState.bearing = trackedPosition.bearing;
    } else {
      offset.bearing = 0;
    }
    // Put the tracked object on the ground
    // TODO - support flying vehicle
    if (trackedPosition) {
      viewState.position = [0, 0, trackedPosition.altitude];
    }

    viewStates[name] = offsetViewState(viewState, offset);
  }

  return viewStates;
}