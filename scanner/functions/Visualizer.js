function Visualizer({
  analyser,
  width,
  height
}) {
  const visualizerStyle = useTypedSelector(selectors_getVisualizerStyle);
  const playing = useTypedSelector(getMediaIsPlaying);
  const butterchurn = useTypedSelector(getButterchurn);
  const trackTitle = useTypedSelector(getCurrentTrackDisplayName);
  const currentPreset = useTypedSelector(getCurrentPreset);
  const transitionType = useTypedSelector(getPresetTransitionType);
  const message = useTypedSelector(getMilkdropMessage);
  const isEnabledVisualizer = visualizerStyle === VISUALIZERS.MILKDROP;
  const canvasRef = Object(react["useRef"])(null);
  const [visualizer, setVisualizer] = Object(react["useState"])(null); // Initialize the visualizer

  Object(react["useEffect"])(() => {
    if (canvasRef.current == null || butterchurn == null) {
      return;
    }

    if (visualizer != null) {
      // Note: The visualizer does not offer anyway to clean itself up. So, we
      // don't offer any way to recreate it. So, if you swap out the analyser
      // node, or the canvas, that change won't be respected.
      return;
    }

    const _visualizer = butterchurn.createVisualizer(analyser.context, canvasRef.current, {
      width,
      height,
      meshWidth: 32,
      meshHeight: 24,
      pixelRatio: window.devicePixelRatio || 1
    });

    _visualizer.connectAudio(analyser);

    setVisualizer(_visualizer);
  }, [butterchurn, analyser, height, width, visualizer]); // Ensure render size stays up to date

  Object(react["useEffect"])(() => {
    if (visualizer == null) {
      return;
    }

    visualizer.setRendererSize(width, height);
  }, [visualizer, width, height]); // Load presets when they change

  const hasLoadedPreset = Object(react["useRef"])(false);
  Object(react["useEffect"])(() => {
    if (visualizer == null || currentPreset == null) {
      return;
    }

    if (hasLoadedPreset.current) {
      visualizer.loadPreset(currentPreset, TRANSITION_TYPE_DURATIONS[transitionType]);
    } else {
      visualizer.loadPreset(currentPreset, TRANSITION_TYPE_DURATIONS[TransitionType.IMMEDIATE]);
      hasLoadedPreset.current = true;
    } // We don't want to trigger the transition if the transition type changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [visualizer, currentPreset]); // Handle title animations

  Object(react["useEffect"])(() => {
    if (visualizer == null || !trackTitle) {
      return;
    }

    visualizer.launchSongTitleAnim(trackTitle);
  }, [visualizer, trackTitle]);
  const lastShownMessage = Object(react["useRef"])(null);
  Object(react["useEffect"])(() => {
    if (visualizer == null || message == null) {
      return;
    }

    if (lastShownMessage.current == null || message.time > lastShownMessage.current) {
      lastShownMessage.current = Date.now();
      visualizer.launchSongTitleAnim(message.text);
    }
  }, [visualizer, message]);
  const shouldAnimate = playing && isEnabledVisualizer; // Kick off the animation loop

  Object(react["useEffect"])(() => {
    if (!shouldAnimate || visualizer == null) {
      return;
    }

    let animationFrameRequest = null;

    const loop = () => {
      (monkey_patch_render(visualizer));
      animationFrameRequest = window.requestAnimationFrame(loop);
    };

    loop();
    return () => {
      if (animationFrameRequest != null) {
        window.cancelAnimationFrame(animationFrameRequest);
      }
    };
  }, [visualizer, shouldAnimate]);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])("canvas", {
    height: height,
    width: width,
    style: {
      height: "100%",
      width: "100%",
      display: isEnabledVisualizer ? "block" : "none"
    },
    ref: canvasRef
  });
}