function InnerElementType({
  children,
  style,
  ...rest
}) {
  const {
    ownerID
  } = Object(react["useContext"])(TreeStateContext);
  const cachedChildWidths = Object(react["useMemo"])(() => new WeakMap(), []); // This ref tracks the current indentation size.
  // We decrease indentation to fit wider/deeper trees.
  // We intentionally do not increase it again afterward, to avoid the perception of content "jumping"
  // e.g. clicking to toggle/collapse a row might otherwise jump horizontally beneath your cursor,
  // e.g. scrolling a wide row off screen could cause narrower rows to jump to the right some.
  //
  // There are two exceptions for this:
  // 1. The first is when the width of the tree increases.
  // The user may have resized the window specifically to make more room for DevTools.
  // In either case, this should reset our max indentation size logic.
  // 2. The second is when the user enters or exits an owner tree.

  const indentationSizeRef = Object(react["useRef"])(DEFAULT_INDENTATION_SIZE);
  const prevListWidthRef = Object(react["useRef"])(0);
  const prevOwnerIDRef = Object(react["useRef"])(ownerID);
  const divRef = Object(react["useRef"])(null); // We shouldn't retain this width across different conceptual trees though,
  // so when the user opens the "owners tree" view, we should discard the previous width.

  if (ownerID !== prevOwnerIDRef.current) {
    prevOwnerIDRef.current = ownerID;
    indentationSizeRef.current = DEFAULT_INDENTATION_SIZE;
  } // When we render new content, measure to see if we need to shrink indentation to fit it.


  Object(react["useEffect"])(() => {
    if (divRef.current !== null) {
      updateIndentationSizeVar(divRef.current, cachedChildWidths, indentationSizeRef, prevListWidthRef);
    }
  }); // This style override enables the background color to fill the full visible width,
  // when combined with the CSS tweaks in Element.
  // A lot of options were considered; this seemed the one that requires the least code.
  // See https://github.com/bvaughn/react-devtools-experimental/issues/9

  return /*#__PURE__*/react["createElement"]("div", Tree_extends({
    className: Tree_default.a.InnerElementType,
    ref: divRef,
    style: style
  }, rest), /*#__PURE__*/react["createElement"](SelectedTreeHighlight_SelectedTreeHighlight, null), children);
}