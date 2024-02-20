function Timeline_Timeline(_) {
  const {
    file,
    inMemoryTimelineData,
    isTimelineSupported,
    setFile,
    viewState
  } = Object(react["useContext"])(TimelineContext);
  const {
    didRecordCommits,
    isProfiling
  } = Object(react["useContext"])(ProfilerContext);
  const ref = Object(react["useRef"])(null); // HACK: Canvas rendering uses an imperative API,
  // but DevTools colors are stored in CSS variables (see root.css and SettingsContext).
  // When the theme changes, we need to trigger update the imperative colors and re-draw the Canvas.

  const {
    theme
  } = Object(react["useContext"])(SettingsContext); // HACK: SettingsContext also uses a useLayoutEffect to update styles;
  // make sure the theme context in SettingsContext updates before this code.

  const deferredTheme = Object(react["useDeferredValue"])(theme); // HACK: Schedule a re-render of the Canvas once colors have been updated.
  // The easiest way to guarangee this happens is to recreate the inner Canvas component.

  const [key, setKey] = Object(react["useState"])(theme);
  Object(react["useLayoutEffect"])(() => {
    const pollForTheme = () => {
      if (updateColorsToMatchTheme(ref.current)) {
        clearInterval(intervalID);
        setKey(deferredTheme);
      }
    };

    const intervalID = setInterval(pollForTheme, 50);
    return () => {
      clearInterval(intervalID);
    };
  }, [deferredTheme]);
  let content = null;

  if (isProfiling) {
    content = /*#__PURE__*/react["createElement"](RecordingInProgress, null);
  } else if (inMemoryTimelineData && inMemoryTimelineData.length > 0) {
    // TODO (timeline) Support multiple renderers.
    const timelineData = inMemoryTimelineData[0];
    content = /*#__PURE__*/react["createElement"](TimelineSearchContextController, {
      profilerData: timelineData,
      viewState: viewState
    }, /*#__PURE__*/react["createElement"](TimelineSearchInput, null), /*#__PURE__*/react["createElement"](src_CanvasPage, {
      profilerData: timelineData,
      viewState: viewState
    }));
  } else if (file) {
    content = /*#__PURE__*/react["createElement"](react["Suspense"], {
      fallback: /*#__PURE__*/react["createElement"](ProcessingData, null)
    }, /*#__PURE__*/react["createElement"](FileLoader, {
      file: file,
      key: key,
      onFileSelect: setFile,
      viewState: viewState
    }));
  } else if (didRecordCommits) {
    content = /*#__PURE__*/react["createElement"](NoTimelineData, null);
  } else if (isTimelineSupported) {
    content = /*#__PURE__*/react["createElement"](NoProfilingData, null);
  } else {
    content = /*#__PURE__*/react["createElement"](TimelineNotSupported_TimelineNotSupported, null);
  }

  return /*#__PURE__*/react["createElement"]("div", {
    className: Timeline_default.a.Content,
    ref: ref
  }, content);
}