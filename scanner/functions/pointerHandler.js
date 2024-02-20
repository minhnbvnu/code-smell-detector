function pointerHandler(evt, eventName) {
  evt.preventDefault();

  let canvas = evt.target;
  let pointer = pointers.get(canvas);
  let { scaleX, scaleY, offsetX, offsetY } = getCanvasOffset(pointer);
  let isTouchEvent = evt.type.includes('touch');

  if (isTouchEvent) {
    // track new touches
    Array.from(evt.touches).map(
      ({ clientX, clientY, identifier }) => {
        let touch = pointer.touches[identifier];
        if (!touch) {
          touch = pointer.touches[identifier] = {
            start: {
              x: (clientX - offsetX) / scaleX,
              y: (clientY - offsetY) / scaleY
            }
          };
          pointer.touches.length++;
        }

        touch.changed = false;
      }
    );

    // handle only changed touches
    Array.from(evt.changedTouches).map(
      ({ clientX, clientY, identifier }) => {
        let touch = pointer.touches[identifier];
        touch.changed = true;
        touch.x = pointer.x = (clientX - offsetX) / scaleX;
        touch.y = pointer.y = (clientY - offsetY) / scaleY;

        callCallback(pointer, eventName, evt);
        emit('touchChanged', evt, pointer.touches);

        // remove touches
        if (eventName == 'onUp') {
          delete pointer.touches[identifier];
          pointer.touches.length--;

          if (!pointer.touches.length) {
            emit('touchEnd');
          }
        }
      }
    );
  } else {
    // translate the scaled size back as if the canvas was at a
    // 1:1 scale
    pointer.x = (evt.clientX - offsetX) / scaleX;
    pointer.y = (evt.clientY - offsetY) / scaleY;

    callCallback(pointer, eventName, evt);
  }
}