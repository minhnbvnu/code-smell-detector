function initGesture() {
  // don't add the on call multiple times otherwise it will mess up
  // gesture events
  if (!init) {
    init = true;

    on('touchChanged', (evt, touches) => {
      Object.keys(gestureMap).map(name => {
        let gesture = gestureMap[name];
        let type;

        if (
          // don't call swipe if at the end of a pinch and there's 1
          // finger left touching
          (!currGesture || currGesture == name) &&
          touches.length == gesture.touches &&
          // ensure that the indices of touches goes from 0..N.
          // otherwise a length 1 touch could have an index of 2
          // which means there were two other touches that started
          // a gesture
          // @see https://stackoverflow.com/a/33352604/2124254
          [...Array(touches.length).keys()].every(
            key => touches[key]
          ) &&
          (type = gesture[evt.type]?.(touches) ?? '') &&
          callbacks[name + type]
        ) {
          currGesture = name;
          callbacks[name + type](evt, touches);
        }
      });
    });

    on('touchEnd', () => {
      // 0 is the shortest falsy value
      currGesture = 0;
    });
  }
}