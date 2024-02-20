function CompositeShape(shape) {
  Shape.apply(this, arguments);
  property(this, 'isComposite', true);

  if (shape.flattened) {
    property(this, 'flattened', shape.flattened || false);
  }
}