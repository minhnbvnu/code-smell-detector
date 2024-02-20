function ClearProfilingDataButton() {
  const store = Object(react["useContext"])(StoreContext);
  const {
    didRecordCommits,
    isProfiling
  } = Object(react["useContext"])(ProfilerContext);
  const {
    file,
    setFile
  } = Object(react["useContext"])(TimelineContext);
  const {
    profilerStore
  } = store;
  const doesHaveInMemoryData = didRecordCommits;
  const doesHaveUserTimingData = file !== null;

  const clear = () => {
    if (doesHaveInMemoryData) {
      profilerStore.clear();
    }

    if (doesHaveUserTimingData) {
      setFile(null);
    }
  };

  return /*#__PURE__*/react["createElement"](Button_Button, {
    disabled: isProfiling || !(doesHaveInMemoryData || doesHaveUserTimingData),
    onClick: clear,
    title: "Clear profiling data"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "clear"
  }));
}