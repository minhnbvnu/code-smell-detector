function InspectedElementHooksTree_InspectedElementHooksTree({
  bridge,
  element,
  hookNames,
  inspectedElement,
  parseHookNames,
  store,
  toggleParseHookNames
}) {
  const {
    hooks,
    id
  } = inspectedElement; // Changing parseHookNames is done in a transition, because it suspends.
  // This value is done outside of the transition, so the UI toggle feels responsive.

  const [parseHookNamesOptimistic, setParseHookNamesOptimistic] = Object(react["useState"])(parseHookNames);

  const handleChange = () => {
    setParseHookNamesOptimistic(!parseHookNames);
    toggleParseHookNames();
  };

  const hookNamesModuleLoader = Object(react["useContext"])(Components_HookNamesModuleLoaderContext);
  const hookParsingFailed = parseHookNames && hookNames === null;
  let toggleTitle;

  if (hookParsingFailed) {
    toggleTitle = 'Hook parsing failed';
  } else if (parseHookNames) {
    toggleTitle = 'Parsing hook names ...';
  } else {
    toggleTitle = 'Parse hook names (may be slow)';
  }

  const handleCopy = () => Object(clipboard["copy"])(serializeHooksForCopy(hooks));

  if (hooks === null) {
    return null;
  } else {
    return /*#__PURE__*/react["createElement"]("div", {
      className: InspectedElementHooksTree_default.a.HooksTreeView,
      "data-testname": "InspectedElementHooksTree"
    }, /*#__PURE__*/react["createElement"]("div", {
      className: InspectedElementHooksTree_default.a.HeaderRow
    }, /*#__PURE__*/react["createElement"]("div", {
      className: InspectedElementHooksTree_default.a.Header
    }, "hooks"), DevToolsFeatureFlags_extension_oss["c" /* enableNamedHooksFeature */] && typeof hookNamesModuleLoader === 'function' && (!parseHookNames || hookParsingFailed) && /*#__PURE__*/react["createElement"](Toggle_Toggle, {
      className: hookParsingFailed ? InspectedElementHooksTree_default.a.ToggleError : null,
      isChecked: parseHookNamesOptimistic,
      isDisabled: parseHookNamesOptimistic || hookParsingFailed,
      onChange: handleChange,
      testName: "LoadHookNamesButton",
      title: toggleTitle
    }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
      type: "parse-hook-names"
    })), /*#__PURE__*/react["createElement"](Button_Button, {
      onClick: handleCopy,
      title: "Copy to clipboard"
    }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
      type: "copy"
    }))), /*#__PURE__*/react["createElement"](InnerHooksTreeView, {
      hookNames: hookNames,
      hooks: hooks,
      id: id,
      element: element,
      inspectedElement: inspectedElement,
      path: []
    }));
  }
}