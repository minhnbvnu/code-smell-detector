function CanvasPage_CanvasPage({
  profilerData,
  viewState
}) {
  return /*#__PURE__*/react["createElement"]("div", {
    className: CanvasPage_default.a.CanvasPage,
    style: {
      backgroundColor: COLORS.BACKGROUND
    }
  }, /*#__PURE__*/react["createElement"](index_esm["a" /* default */], null, ({
    height,
    width
  }) => /*#__PURE__*/react["createElement"](AutoSizedCanvas, {
    data: profilerData,
    height: height,
    viewState: viewState,
    width: width
  })));
}