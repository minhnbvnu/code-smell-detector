function Tool(context) {
  Substance.EventEmitter.call(this);

  this.context = context;

  this.state = {
    // we disable tools by default
    disabled: true,
    // if the tool is turned on / toggled on
    active: false
  };
}