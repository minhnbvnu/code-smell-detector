function ModeInterface(ctx) {
  this.map = ctx.map;
  this.drawConfig = JSON.parse(JSON.stringify(ctx.options || {}));
  this._ctx = ctx;
}