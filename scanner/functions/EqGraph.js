function EqGraph() {
  const sliders = useTypedSelector(getSliders);
  const preampLineImagePromise = useTypedSelector(getPreampLineImage);
  const preampLineImage = usePromiseValueOrNull(preampLineImagePromise);
  const [canvasNode, setCanvasNode] = Object(react["useState"])(null);
  const canvasCtx = Object(react["useMemo"])(() => {
    var _canvasNode$getContex;

    return (_canvasNode$getContex = canvasNode === null || canvasNode === void 0 ? void 0 : canvasNode.getContext("2d")) !== null && _canvasNode$getContex !== void 0 ? _canvasNode$getContex : null;
  }, [canvasNode]);
  const colorPattern = useColorPattern(canvasCtx);
  Object(react["useLayoutEffect"])(() => {
    if (canvasCtx == null || canvasNode == null || preampLineImage == null || colorPattern == null) {
      return;
    }

    const width = Number(canvasNode.width);
    const height = Number(canvasNode.height);
    canvasCtx.clearRect(0, 0, width, height);
    drawEqLine({
      colorPattern,
      sliders,
      canvasCtx,
      preampLineImage
    });
  }, [canvasCtx, canvasNode, colorPattern, preampLineImage, sliders]);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])("canvas", {
    id: "eqGraph",
    ref: setCanvasNode,
    width: GRAPH_WIDTH,
    height: GRAPH_HEIGHT
  });
}