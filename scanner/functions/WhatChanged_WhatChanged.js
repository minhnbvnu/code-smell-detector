function WhatChanged_WhatChanged({
  fiberID
}) {
  const {
    profilerStore
  } = Object(react["useContext"])(StoreContext);
  const {
    rootID,
    selectedCommitIndex
  } = Object(react["useContext"])(ProfilerContext); // TRICKY
  // Handle edge case where no commit is selected because of a min-duration filter update.
  // If the commit index is null, suspending for data below would throw an error.
  // TODO (ProfilerContext) This check should not be necessary.

  if (selectedCommitIndex === null) {
    return null;
  }

  const {
    changeDescriptions
  } = profilerStore.getCommitData(rootID, selectedCommitIndex);

  if (changeDescriptions === null) {
    return null;
  }

  const changeDescription = changeDescriptions.get(fiberID);

  if (changeDescription == null) {
    return null;
  }

  const {
    context,
    didHooksChange,
    hooks,
    isFirstMount,
    props,
    state
  } = changeDescription;

  if (isFirstMount) {
    return /*#__PURE__*/react["createElement"]("div", {
      className: WhatChanged_default.a.Component
    }, /*#__PURE__*/react["createElement"]("label", {
      className: WhatChanged_default.a.Label
    }, "Why did this render?"), /*#__PURE__*/react["createElement"]("div", {
      className: WhatChanged_default.a.Item
    }, "This is the first time the component rendered."));
  }

  const changes = [];

  if (context === true) {
    changes.push( /*#__PURE__*/react["createElement"]("div", {
      key: "context",
      className: WhatChanged_default.a.Item
    }, "\u2022 Context changed"));
  } else if (typeof context === 'object' && context !== null && context.length !== 0) {
    changes.push( /*#__PURE__*/react["createElement"]("div", {
      key: "context",
      className: WhatChanged_default.a.Item
    }, "\u2022 Context changed:", context.map(key => /*#__PURE__*/react["createElement"]("span", {
      key: key,
      className: WhatChanged_default.a.Key
    }, key))));
  }

  if (didHooksChange) {
    if (DevToolsFeatureFlags_extension_oss["d" /* enableProfilerChangedHookIndices */] && Array.isArray(hooks)) {
      changes.push( /*#__PURE__*/react["createElement"]("div", {
        key: "hooks",
        className: WhatChanged_default.a.Item
      }, "\u2022 ", hookIndicesToString(hooks)));
    } else {
      changes.push( /*#__PURE__*/react["createElement"]("div", {
        key: "hooks",
        className: WhatChanged_default.a.Item
      }, "\u2022 Hooks changed"));
    }
  }

  if (props !== null && props.length !== 0) {
    changes.push( /*#__PURE__*/react["createElement"]("div", {
      key: "props",
      className: WhatChanged_default.a.Item
    }, "\u2022 Props changed:", props.map(key => /*#__PURE__*/react["createElement"]("span", {
      key: key,
      className: WhatChanged_default.a.Key
    }, key))));
  }

  if (state !== null && state.length !== 0) {
    changes.push( /*#__PURE__*/react["createElement"]("div", {
      key: "state",
      className: WhatChanged_default.a.Item
    }, "\u2022 State changed:", state.map(key => /*#__PURE__*/react["createElement"]("span", {
      key: key,
      className: WhatChanged_default.a.Key
    }, key))));
  }

  if (changes.length === 0) {
    changes.push( /*#__PURE__*/react["createElement"]("div", {
      key: "nothing",
      className: WhatChanged_default.a.Item
    }, "The parent component rendered."));
  }

  return /*#__PURE__*/react["createElement"]("div", {
    className: WhatChanged_default.a.Component
  }, /*#__PURE__*/react["createElement"]("label", {
    className: WhatChanged_default.a.Label
  }, "Why did this render?"), changes);
}