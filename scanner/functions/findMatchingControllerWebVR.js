function findMatchingControllerWebVR (controllers, filterIdExact, filterIdPrefix, filterHand,
                                 filterControllerIndex) {
  var controller;
  var i;
  var matchingControllerOccurence = 0;
  var targetControllerMatch = filterControllerIndex >= 0 ? filterControllerIndex : 0;

  for (i = 0; i < controllers.length; i++) {
    controller = controllers[i];

    // Determine if the controller ID matches our criteria.
    if (filterIdPrefix && !controller.id.startsWith(filterIdPrefix)) {
      continue;
    }

    if (!filterIdPrefix && controller.id !== filterIdExact) { continue; }

    // If the hand filter and controller handedness are defined we compare them.
    if (filterHand && controller.hand && filterHand !== controller.hand) { continue; }

    // If we have detected an unhanded controller and the component was asking
    // for a particular hand, we need to treat the controllers in the array as
    // pairs of controllers. This effectively means that we need to skip
    // NUM_HANDS matches for each controller number, instead of 1.
    if (filterHand && !controller.hand) {
      targetControllerMatch = NUM_HANDS * filterControllerIndex + ((filterHand === DEFAULT_HANDEDNESS) ? 0 : 1);
    } else {
      return controller;
    }

    // We are looking for the nth occurence of a matching controller
    // (n equals targetControllerMatch).
    if (matchingControllerOccurence === targetControllerMatch) { return controller; }
    ++matchingControllerOccurence;
  }
  return undefined;
}