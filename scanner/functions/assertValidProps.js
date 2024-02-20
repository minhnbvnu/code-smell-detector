function assertValidProps(props) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  if (props.dangerouslySetInnerHTML != null) {
    ("production" !== "development" ? invariant(
      props.children == null,
      'Can only set one of `children` or `props.dangerouslySetInnerHTML`.'
    ) : invariant(props.children == null));
    ("production" !== "development" ? invariant(
      typeof props.dangerouslySetInnerHTML === 'object' &&
      '__html' in props.dangerouslySetInnerHTML,
      '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' +
      'Please visit https://fb.me/react-invariant-dangerously-set-inner-html ' +
      'for more information.'
    ) : invariant(typeof props.dangerouslySetInnerHTML === 'object' &&
    '__html' in props.dangerouslySetInnerHTML));
  }
  if ("production" !== "development") {
    ("production" !== "development" ? warning(
      props.innerHTML == null,
      'Directly setting property `innerHTML` is not permitted. ' +
      'For more information, lookup documentation on `dangerouslySetInnerHTML`.'
    ) : null);
    ("production" !== "development" ? warning(
      !props.contentEditable || props.children == null,
      'A component is `contentEditable` and contains `children` managed by ' +
      'React. It is now your responsibility to guarantee that none of ' +
      'those nodes are unexpectedly modified or duplicated. This is ' +
      'probably not intentional.'
    ) : null);
  }
  ("production" !== "development" ? invariant(
    props.style == null || typeof props.style === 'object',
    'The `style` prop expects a mapping from style properties to values, ' +
    'not a string. For example, style={{marginRight: spacing + \'em\'}} when ' +
    'using JSX.'
  ) : invariant(props.style == null || typeof props.style === 'object'));
}