function AutoSizeInput_AutoSizeInput({
  className,
  onFocus,
  placeholder = '',
  testName,
  value,
  ...rest
}) {
  // $FlowFixMe[missing-local-annot]
  const onFocusWrapper = event => {
    const input = event.target;

    if (input !== null) {
      input.selectionStart = 0;
      input.selectionEnd = value.length;
    }

    if (typeof onFocus === 'function') {
      onFocus(event);
    }
  };

  const isEmpty = value === '' || value === '""';
  return (
    /*#__PURE__*/
    // $FlowFixMe unsafe rest spread
    react["createElement"]("input", AutoSizeInput_extends({
      className: [AutoSizeInput_default.a.Input, className].join(' '),
      "data-testname": testName,
      onFocus: onFocusWrapper,
      placeholder: placeholder,
      style: {
        width: `calc(${isEmpty ? placeholder.length : value.length}ch + 1px)`
      },
      value: isEmpty ? '' : value
    }, rest))
  );
}