function LayoutViewer_LayoutViewer({
  id,
  layout
}) {
  const {
    height,
    margin,
    padding,
    y,
    width,
    x
  } = layout;
  return /*#__PURE__*/react["createElement"]("div", {
    className: LayoutViewer_default.a.LayoutViewer
  }, /*#__PURE__*/react["createElement"]("div", {
    className: LayoutViewer_default.a.Header
  }, "layout"), /*#__PURE__*/react["createElement"]("div", {
    className: LayoutViewer_default.a.DashedBox
  }, /*#__PURE__*/react["createElement"]("div", {
    className: LayoutViewer_default.a.LabelRow
  }, /*#__PURE__*/react["createElement"]("label", {
    className: LayoutViewer_default.a.Label
  }, "margin"), /*#__PURE__*/react["createElement"]("label", null, margin.top || '-')), /*#__PURE__*/react["createElement"]("div", {
    className: LayoutViewer_default.a.BoxRow
  }, /*#__PURE__*/react["createElement"]("label", null, margin.left || '-'), /*#__PURE__*/react["createElement"]("div", {
    className: LayoutViewer_default.a.SolidBox
  }, /*#__PURE__*/react["createElement"]("div", {
    className: LayoutViewer_default.a.LabelRow
  }, /*#__PURE__*/react["createElement"]("label", {
    className: LayoutViewer_default.a.Label
  }, "padding"), /*#__PURE__*/react["createElement"]("label", null, padding.top || '-')), /*#__PURE__*/react["createElement"]("div", {
    className: LayoutViewer_default.a.BoxRow
  }, /*#__PURE__*/react["createElement"]("label", null, padding.left || '-'), /*#__PURE__*/react["createElement"]("div", {
    className: LayoutViewer_default.a.DashedBox
  }, /*#__PURE__*/react["createElement"]("div", {
    className: LayoutViewer_default.a.LabelRow
  }, format(width), " x ", format(height), " (", format(x), ", ", format(y), ")")), /*#__PURE__*/react["createElement"]("label", null, padding.right || '-')), /*#__PURE__*/react["createElement"]("label", null, padding.bottom || '-')), /*#__PURE__*/react["createElement"]("label", null, margin.right || '-')), /*#__PURE__*/react["createElement"]("label", null, margin.bottom || '-')));
}