function StringShape() {
  Shape.apply(this, arguments);

  if (this.api) {
    switch (this.api.protocol) {
      case 'rest-xml':
      case 'query':
      case 'ec2':
        this.toType = function(value) { return value || ''; };
    }
  }
}