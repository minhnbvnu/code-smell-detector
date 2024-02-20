function attachListener(ev, fxn, ctx) {
  // LM removing, not sure why we had this?
  // var _this = ctx;
  // var f = function (e) { fxn(e, _this); };
  var f = fxn.bind(ctx);
  ctx.elt.addEventListener(ev, f, false);
  ctx._events[ev] = f;
}