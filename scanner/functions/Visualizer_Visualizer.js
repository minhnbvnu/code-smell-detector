function Visualizer_Visualizer({
  analyser
}) {
  Object(react["useLayoutEffect"])(() => {
    analyser.fftSize = 2048;
  }, [analyser.fftSize]);
  const colors = useTypedSelector(getSkinColors);
  const style = useTypedSelector(selectors_getVisualizerStyle);
  const status = useTypedSelector(getMediaStatus);
  const getWindowShade = useTypedSelector(selectors_getWindowShade);
  const dummyVizData = useTypedSelector(getDummyVizData);
  const toggleVisualizerStyle = useActionCreator(actionCreators_toggleVisualizerStyle);
  const windowShade = getWindowShade("main");
  const renderWidth = windowShade ? 38 : 76;
  const renderHeight = windowShade ? 5 : 16;
  const width = renderWidth * Visualizer_PIXEL_DENSITY;
  const height = renderHeight * Visualizer_PIXEL_DENSITY;
  const bgCanvas = Object(react["useMemo"])(() => {
    return preRenderBg(width, height, colors[0], colors[1], Boolean(windowShade));
  }, [colors, height, width, windowShade]);
  const paintOscilloscopeFrame = usePaintOscilloscopeFrame({
    analyser,
    height,
    width,
    renderWidth
  });
  const paintBarFrame = usePaintBarFrame({
    analyser,
    height,
    renderHeight
  });
  const paintBar = usePaintBar({
    height,
    renderHeight
  });
  const paintFrame = Object(react["useCallback"])(canvasCtx => {
    if (status !== MEDIA_STATUS.PLAYING) {
      return;
    }

    if (dummyVizData) {
      canvasCtx.drawImage(bgCanvas, 0, 0);
      Object.entries(dummyVizData).forEach(([i, value]) => {
        paintBar(canvasCtx, Number(i), value, -1);
      });
      return;
    }

    switch (style) {
      case VISUALIZERS.OSCILLOSCOPE:
        canvasCtx.drawImage(bgCanvas, 0, 0);
        paintOscilloscopeFrame(canvasCtx);
        break;

      case VISUALIZERS.BAR:
        canvasCtx.drawImage(bgCanvas, 0, 0);
        paintBarFrame(canvasCtx);
        break;

      default:
        canvasCtx.clearRect(0, 0, width, height);
    }
  }, [bgCanvas, dummyVizData, height, paintBar, paintBarFrame, paintOscilloscopeFrame, status, style, width]);
  const [canvas, setCanvas] = Object(react["useState"])(null);
  Object(react["useLayoutEffect"])(() => {
    if (canvas == null) {
      return;
    }

    const canvasCtx = canvas.getContext("2d");

    if (canvasCtx == null) {
      return;
    }

    canvasCtx.imageSmoothingEnabled = false;
    let animationRequest = null; // Kick off the animation loop

    const loop = () => {
      paintFrame(canvasCtx);
      animationRequest = window.requestAnimationFrame(loop);
    };

    loop();
    return () => {
      if (animationRequest != null) {
        window.cancelAnimationFrame(animationRequest);
      }
    };
  }, [canvas, paintFrame]);

  if (status === MEDIA_STATUS.STOPPED) {
    return null;
  }

  return /*#__PURE__*/Object(jsx_runtime["jsx"])("canvas", {
    id: "visualizer",
    ref: setCanvas,
    style: {
      width: renderWidth,
      height: renderHeight
    },
    width: width,
    height: height,
    onClick: toggleVisualizerStyle
  });
}