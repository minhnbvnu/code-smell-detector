function RootSelector_RootSelector(_) {
  const {
    profilingData,
    rootID,
    setRootID
  } = Object(react["useContext"])(ProfilerContext);
  const options = [];

  if (profilingData !== null) {
    profilingData.dataForRoots.forEach((dataForRoot, id) => {
      options.push( /*#__PURE__*/react["createElement"]("option", {
        key: id,
        value: id
      }, dataForRoot.displayName));
    });
  }

  const handleChange = Object(react["useCallback"])(({
    currentTarget
  }) => {
    setRootID(parseInt(currentTarget.value, 10));
  }, [setRootID]);

  if (profilingData === null || profilingData.dataForRoots.size <= 1) {
    // Don't take up visual space if there's only one root.
    return null;
  }

  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: RootSelector_default.a.Spacer
  }), /*#__PURE__*/react["createElement"]("select", {
    value: rootID,
    onChange: handleChange
  }, options));
}