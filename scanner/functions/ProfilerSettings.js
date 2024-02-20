function ProfilerSettings(_) {
  const {
    isCommitFilterEnabled,
    minCommitDuration,
    setIsCommitFilterEnabled,
    setMinCommitDuration
  } = Object(react["useContext"])(ProfilerContext);
  const store = Object(react["useContext"])(StoreContext);
  const recordChangeDescriptionsSubscription = Object(react["useMemo"])(() => ({
    getCurrentValue: () => store.recordChangeDescriptions,
    subscribe: callback => {
      store.addListener('recordChangeDescriptions', callback);
      return () => store.removeListener('recordChangeDescriptions', callback);
    }
  }), [store]);
  const recordChangeDescriptions = useSubscription(recordChangeDescriptionsSubscription);
  const updateRecordChangeDescriptions = Object(react["useCallback"])(({
    currentTarget
  }) => {
    store.recordChangeDescriptions = currentTarget.checked;
  }, [store]);
  const updateMinCommitDuration = Object(react["useCallback"])(event => {
    const newValue = parseFloat(event.currentTarget.value);
    setMinCommitDuration(Number.isNaN(newValue) || newValue <= 0 ? 0 : newValue);
  }, [setMinCommitDuration]);
  const updateIsCommitFilterEnabled = Object(react["useCallback"])(event => {
    const checked = event.currentTarget.checked;
    setIsCommitFilterEnabled(checked);

    if (checked) {
      if (minCommitDurationInputRef.current !== null) {
        minCommitDurationInputRef.current.focus();
      }
    }
  }, [setIsCommitFilterEnabled]);
  const minCommitDurationInputRef = Object(react["useRef"])(null);
  return /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Settings
  }, /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Setting
  }, /*#__PURE__*/react["createElement"]("label", null, /*#__PURE__*/react["createElement"]("input", {
    type: "checkbox",
    checked: recordChangeDescriptions,
    onChange: updateRecordChangeDescriptions
  }), ' ', "Record why each component rendered while profiling.")), /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Setting
  }, /*#__PURE__*/react["createElement"]("label", null, /*#__PURE__*/react["createElement"]("input", {
    checked: isCommitFilterEnabled,
    onChange: updateIsCommitFilterEnabled,
    type: "checkbox"
  }), ' ', "Hide commits below"), ' ', /*#__PURE__*/react["createElement"]("input", {
    className: SettingsShared_default.a.Input,
    onChange: updateMinCommitDuration,
    ref: minCommitDurationInputRef,
    type: "number",
    value: minCommitDuration
  }), ' ', "(ms)"));
}