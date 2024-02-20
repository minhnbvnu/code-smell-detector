function NewRow({
  changeAttribute,
  changeValue,
  validAttributes
}) {
  const [key, setKey] = Object(react["useState"])(0);

  const reset = () => setKey(key + 1);

  const newAttributeRef = Object(react["useRef"])('');

  const changeAttributeWrapper = (oldAttribute, newAttribute, value) => {
    // Ignore attribute changes until a value has been specified
    newAttributeRef.current = newAttribute;
  };

  const changeValueWrapper = (attribute, value) => {
    // Blur events should reset/cancel if there's no value or no attribute
    if (newAttributeRef.current !== '') {
      if (value !== '') {
        changeValue(newAttributeRef.current, value);
      }

      reset();
    }
  };

  return /*#__PURE__*/react["createElement"](Row, {
    key: key,
    attribute: '',
    attributePlaceholder: "attribute",
    changeAttribute: changeAttributeWrapper,
    changeValue: changeValueWrapper,
    validAttributes: validAttributes,
    value: '',
    valuePlaceholder: "value"
  });
}