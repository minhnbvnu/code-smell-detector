function createMotionControllersList () {
    var controllersList = [];

    for (var i = 0; i < arguments.length; i++) {
      controllersList.push(
        {id: 'Spatial Controller (Spatial Interaction Source) 045E-065A', index: i, hand: arguments[i], pose: {}}
      );
    }

    return controllersList;
  }