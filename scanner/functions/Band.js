function Band({
  id,
  onChange,
  band
}) {
  const sliders = useTypedSelector(getSliders);
  const value = sliders[band];
  const backgroundPosition = Object(react["useMemo"])(() => {
    const {
      x,
      y
    } = spriteOffsets(spriteNumber(value));
    const xOffset = x * 15; // Each sprite is 15px wide

    const yOffset = y * 65; // Each sprite is 15px tall

    return `-${xOffset}px -${yOffset}px`;
  }, [value]);
  const focusBand = useActionCreator(actionCreators_focusBand);
  const usetFocus = useActionCreator(actionCreators_unsetFocus); // Note: The band background is actually one pixel taller (63) than the slider
  // it contains (62).

  return /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
    id: id,
    className: "band",
    style: {
      backgroundPosition,
      height: 63
    },
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])(VerticalSlider, {
      height: 62,
      width: 14,
      handleHeight: 11,
      value: 1 - value / MAX_VALUE,
      onBeforeChange: () => focusBand(band),
      onChange: val => onChange((1 - val) * MAX_VALUE),
      onAfterChange: usetFocus,
      handle: /*#__PURE__*/Object(jsx_runtime["jsx"])(Band_Handle, {})
    })
  });
}