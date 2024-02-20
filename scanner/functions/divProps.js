function divProps(children, prop) {
  return CreateReactClass({
    render: function() {
      var propVal = this.props[prop];
      if (typeof propVal === 'object') propVal = JSON.stringify(propVal);
      return div(children, propVal);
    }
  });
}