function normalBind(source, context) {
  this.source = source;
  this.context = context;

  if (this.bindingObserver === null) {
    this.bindingObserver = Observable.binding(this.binding, this, this.isBindingVolatile);
  }

  this.updateTarget(this.bindingObserver.observe(source, context));
}