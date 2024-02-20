function labelStateFromProps(props, state) {
  let { placeholder, defaultValue } = props;
  let { text, receivedFocus } = state;

  return !!(placeholder || text || (!receivedFocus && defaultValue));
}