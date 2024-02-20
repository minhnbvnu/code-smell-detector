function errorStateFromProps(props, state) {
  let { error } = props;

  return !!error;
}