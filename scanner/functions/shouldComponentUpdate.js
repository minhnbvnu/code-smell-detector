function shouldComponentUpdate(nextProps, nextState) {
  return !areEqual(this.props, nextProps) || shallowDiffers(this.state, nextState);
}