function initPointer({
  radius = 5,
  canvas = getCanvas()
} = {}) {
  let pointer = pointers.get(canvas);
  if (!pointer) {
    let style = window.getComputedStyle(canvas);

    pointer = {
      x: 0,
      y: 0,
      radius,
      touches: { length: 0 },
      canvas,

      // cf = current frame, lf = last frame, o = objects,
      // oo = over object, _s = style
      _cf: [],
      _lf: [],
      _o: [],
      _oo: null,
      _s: style
    };
    pointers.set(canvas, pointer);
  }

  // if this function is called multiple times, the same event
  // won't be added multiple times
  // @see https://stackoverflow.com/questions/28056716/check-if-an-element-has-event-listener-on-it-no-jquery/41137585#41137585
  canvas.addEventListener('mousedown', pointerDownHandler);
  canvas.addEventListener('touchstart', pointerDownHandler);
  canvas.addEventListener('mouseup', pointerUpHandler);
  canvas.addEventListener('touchend', pointerUpHandler);
  canvas.addEventListener('touchcancel', pointerUpHandler);
  canvas.addEventListener('blur', blurEventHandler);
  canvas.addEventListener('mousemove', mouseMoveHandler);
  canvas.addEventListener('touchmove', mouseMoveHandler);

  // however, the tick event should only be registered once
  // otherwise it completely destroys pointer events
  if (!pointer._t) {
    pointer._t = true;

    // reset object render order on every new frame
    on('tick', () => {
      pointer._lf.length = 0;

      pointer._cf.map(object => {
        pointer._lf.push(object);
      });

      pointer._cf.length = 0;
    });
  }

  return pointer;
}