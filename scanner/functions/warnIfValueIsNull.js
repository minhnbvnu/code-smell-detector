function warnIfValueIsNull(props) {
  if (props != null && props.value === null && !didWarnValueNull) {
    "development" !== 'production' ? warning(false, '`value` prop on `textarea` should not be null. ' + 'Consider using the empty string to clear the component or `undefined` ' + 'for uncontrolled components.') : void 0;

    didWarnValueNull = true;
  }
}