function ComponentsSettings(_) {
  var _process$env$EDITOR_U;

  const store = Object(react["useContext"])(StoreContext);
  const {
    parseHookNames,
    setParseHookNames
  } = Object(react["useContext"])(SettingsContext);
  const collapseNodesByDefaultSubscription = Object(react["useMemo"])(() => ({
    getCurrentValue: () => store.collapseNodesByDefault,
    subscribe: callback => {
      store.addListener('collapseNodesByDefault', callback);
      return () => store.removeListener('collapseNodesByDefault', callback);
    }
  }), [store]);
  const collapseNodesByDefault = useSubscription(collapseNodesByDefaultSubscription);
  const updateCollapseNodesByDefault = Object(react["useCallback"])(({
    currentTarget
  }) => {
    store.collapseNodesByDefault = !currentTarget.checked;
  }, [store]);
  const updateParseHookNames = Object(react["useCallback"])(({
    currentTarget
  }) => {
    setParseHookNames(currentTarget.checked);
  }, [setParseHookNames]);
  const [openInEditorURL, setOpenInEditorURL] = useLocalStorage(constants["k" /* LOCAL_STORAGE_OPEN_IN_EDITOR_URL */], Object(utils["j" /* getDefaultOpenInEditorURL */])());
  const [componentFilters, setComponentFilters] = Object(react["useState"])(() => [...store.componentFilters]);
  const addFilter = Object(react["useCallback"])(() => {
    setComponentFilters(prevComponentFilters => {
      return [...prevComponentFilters, {
        type: types["b" /* ComponentFilterElementType */],
        value: types["i" /* ElementTypeHostComponent */],
        isEnabled: true
      }];
    });
  }, []);
  const changeFilterType = Object(react["useCallback"])((componentFilter, type) => {
    setComponentFilters(prevComponentFilters => {
      const cloned = [...prevComponentFilters];
      const index = prevComponentFilters.indexOf(componentFilter);

      if (index >= 0) {
        if (type === types["b" /* ComponentFilterElementType */]) {
          cloned[index] = {
            type: types["b" /* ComponentFilterElementType */],
            isEnabled: componentFilter.isEnabled,
            value: types["i" /* ElementTypeHostComponent */]
          };
        } else if (type === types["a" /* ComponentFilterDisplayName */]) {
          cloned[index] = {
            type: types["a" /* ComponentFilterDisplayName */],
            isEnabled: componentFilter.isEnabled,
            isValid: true,
            value: ''
          };
        } else if (type === types["d" /* ComponentFilterLocation */]) {
          cloned[index] = {
            type: types["d" /* ComponentFilterLocation */],
            isEnabled: componentFilter.isEnabled,
            isValid: true,
            value: ''
          };
        } else if (type === types["c" /* ComponentFilterHOC */]) {
          cloned[index] = {
            type: types["c" /* ComponentFilterHOC */],
            isEnabled: componentFilter.isEnabled,
            isValid: true
          };
        }
      }

      return cloned;
    });
  }, []);
  const updateFilterValueElementType = Object(react["useCallback"])((componentFilter, value) => {
    if (componentFilter.type !== types["b" /* ComponentFilterElementType */]) {
      throw Error('Invalid value for element type filter');
    }

    setComponentFilters(prevComponentFilters => {
      const cloned = [...prevComponentFilters];

      if (componentFilter.type === types["b" /* ComponentFilterElementType */]) {
        const index = prevComponentFilters.indexOf(componentFilter);

        if (index >= 0) {
          cloned[index] = { ...componentFilter,
            value
          };
        }
      }

      return cloned;
    });
  }, []);
  const updateFilterValueRegExp = Object(react["useCallback"])((componentFilter, value) => {
    if (componentFilter.type === types["b" /* ComponentFilterElementType */]) {
      throw Error('Invalid value for element type filter');
    }

    setComponentFilters(prevComponentFilters => {
      const cloned = [...prevComponentFilters];

      if (componentFilter.type === types["a" /* ComponentFilterDisplayName */] || componentFilter.type === types["d" /* ComponentFilterLocation */]) {
        const index = prevComponentFilters.indexOf(componentFilter);

        if (index >= 0) {
          let isValid = true;

          try {
            new RegExp(value); // eslint-disable-line no-new
          } catch (error) {
            isValid = false;
          }

          cloned[index] = { ...componentFilter,
            isValid,
            value
          };
        }
      }

      return cloned;
    });
  }, []);
  const removeFilter = Object(react["useCallback"])(index => {
    setComponentFilters(prevComponentFilters => {
      const cloned = [...prevComponentFilters];
      cloned.splice(index, 1);
      return cloned;
    });
  }, []);
  const toggleFilterIsEnabled = Object(react["useCallback"])((componentFilter, isEnabled) => {
    setComponentFilters(prevComponentFilters => {
      const cloned = [...prevComponentFilters];
      const index = prevComponentFilters.indexOf(componentFilter);

      if (index >= 0) {
        if (componentFilter.type === types["b" /* ComponentFilterElementType */]) {
          cloned[index] = { ...cloned[index],
            isEnabled
          };
        } else if (componentFilter.type === types["a" /* ComponentFilterDisplayName */] || componentFilter.type === types["d" /* ComponentFilterLocation */]) {
          cloned[index] = { ...cloned[index],
            isEnabled
          };
        } else if (componentFilter.type === types["c" /* ComponentFilterHOC */]) {
          cloned[index] = { ...cloned[index],
            isEnabled
          };
        }
      }

      return cloned;
    });
  }, []); // Filter updates are expensive to apply (since they impact the entire tree).
  // Only apply them on unmount.
  // The Store will avoid doing any expensive work unless they've changed.
  // We just want to batch the work in the event that they do change.

  const componentFiltersRef = Object(react["useRef"])(componentFilters);
  Object(react["useEffect"])(() => {
    componentFiltersRef.current = componentFilters;
    return () => {};
  }, [componentFilters]);
  Object(react["useEffect"])(() => () => {
    store.componentFilters = [...componentFiltersRef.current];
  }, [store]);
  return /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Settings
  }, /*#__PURE__*/react["createElement"]("label", {
    className: SettingsShared_default.a.Setting
  }, /*#__PURE__*/react["createElement"]("input", {
    type: "checkbox",
    checked: !collapseNodesByDefault,
    onChange: updateCollapseNodesByDefault
  }), ' ', "Expand component tree by default"), /*#__PURE__*/react["createElement"]("label", {
    className: SettingsShared_default.a.Setting
  }, /*#__PURE__*/react["createElement"]("input", {
    type: "checkbox",
    checked: parseHookNames,
    onChange: updateParseHookNames
  }), ' ', "Always parse hook names from source", ' ', /*#__PURE__*/react["createElement"]("span", {
    className: SettingsShared_default.a.Warning
  }, "(may be slow)")), /*#__PURE__*/react["createElement"]("label", {
    className: SettingsShared_default.a.OpenInURLSetting
  }, "Open in Editor URL:", ' ', /*#__PURE__*/react["createElement"]("input", {
    className: SettingsShared_default.a.Input,
    type: "text",
    placeholder: (_process$env$EDITOR_U = null) !== null && _process$env$EDITOR_U !== void 0 ? _process$env$EDITOR_U : 'vscode://file/{path}:{line}',
    value: openInEditorURL,
    onChange: event => {
      setOpenInEditorURL(event.target.value);
    }
  })), /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Header
  }, "Hide components where..."), /*#__PURE__*/react["createElement"]("table", {
    className: SettingsShared_default.a.Table
  }, /*#__PURE__*/react["createElement"]("tbody", null, componentFilters.length === 0 && /*#__PURE__*/react["createElement"]("tr", {
    className: SettingsShared_default.a.TableRow
  }, /*#__PURE__*/react["createElement"]("td", {
    className: SettingsShared_default.a.NoFiltersCell
  }, "No filters have been added.")), componentFilters.map((componentFilter, index) => /*#__PURE__*/react["createElement"]("tr", {
    className: SettingsShared_default.a.TableRow,
    key: index
  }, /*#__PURE__*/react["createElement"]("td", {
    className: SettingsShared_default.a.TableCell
  }, /*#__PURE__*/react["createElement"](Toggle_Toggle, {
    className: componentFilter.isValid !== false ? '' : SettingsShared_default.a.InvalidRegExp,
    isChecked: componentFilter.isEnabled,
    onChange: isEnabled => toggleFilterIsEnabled(componentFilter, isEnabled),
    title: componentFilter.isValid === false ? 'Filter invalid' : componentFilter.isEnabled ? 'Filter enabled' : 'Filter disabled'
  }, /*#__PURE__*/react["createElement"](ToggleIcon, {
    isEnabled: componentFilter.isEnabled,
    isValid: componentFilter.isValid == null || componentFilter.isValid === true
  }))), /*#__PURE__*/react["createElement"]("td", {
    className: SettingsShared_default.a.TableCell
  }, /*#__PURE__*/react["createElement"]("select", {
    className: SettingsShared_default.a.Select,
    value: componentFilter.type,
    onChange: ({
      currentTarget
    }) => changeFilterType(componentFilter, parseInt(currentTarget.value, 10))
  }, /*#__PURE__*/react["createElement"]("option", {
    value: types["d" /* ComponentFilterLocation */]
  }, "location"), /*#__PURE__*/react["createElement"]("option", {
    value: types["a" /* ComponentFilterDisplayName */]
  }, "name"), /*#__PURE__*/react["createElement"]("option", {
    value: types["b" /* ComponentFilterElementType */]
  }, "type"), /*#__PURE__*/react["createElement"]("option", {
    value: types["c" /* ComponentFilterHOC */]
  }, "hoc"))), /*#__PURE__*/react["createElement"]("td", {
    className: SettingsShared_default.a.TableCell
  }, componentFilter.type === types["b" /* ComponentFilterElementType */] && 'equals', (componentFilter.type === types["d" /* ComponentFilterLocation */] || componentFilter.type === types["a" /* ComponentFilterDisplayName */]) && 'matches'), /*#__PURE__*/react["createElement"]("td", {
    className: SettingsShared_default.a.TableCell
  }, componentFilter.type === types["b" /* ComponentFilterElementType */] && /*#__PURE__*/react["createElement"]("select", {
    className: SettingsShared_default.a.Select,
    value: componentFilter.value,
    onChange: ({
      currentTarget
    }) => updateFilterValueElementType(componentFilter, parseInt(currentTarget.value, 10))
  }, /*#__PURE__*/react["createElement"]("option", {
    value: types["e" /* ElementTypeClass */]
  }, "class"), /*#__PURE__*/react["createElement"]("option", {
    value: types["f" /* ElementTypeContext */]
  }, "context"), /*#__PURE__*/react["createElement"]("option", {
    value: types["h" /* ElementTypeFunction */]
  }, "function"), /*#__PURE__*/react["createElement"]("option", {
    value: types["g" /* ElementTypeForwardRef */]
  }, "forward ref"), /*#__PURE__*/react["createElement"]("option", {
    value: types["i" /* ElementTypeHostComponent */]
  }, "dom nodes (e.g. <div>)"), /*#__PURE__*/react["createElement"]("option", {
    value: types["j" /* ElementTypeMemo */]
  }, "memo"), /*#__PURE__*/react["createElement"]("option", {
    value: types["k" /* ElementTypeOtherOrUnknown */]
  }, "other"), /*#__PURE__*/react["createElement"]("option", {
    value: types["l" /* ElementTypeProfiler */]
  }, "profiler"), /*#__PURE__*/react["createElement"]("option", {
    value: types["n" /* ElementTypeSuspense */]
  }, "suspense")), (componentFilter.type === types["d" /* ComponentFilterLocation */] || componentFilter.type === types["a" /* ComponentFilterDisplayName */]) && /*#__PURE__*/react["createElement"]("input", {
    className: SettingsShared_default.a.Input,
    type: "text",
    placeholder: "Regular expression",
    onChange: ({
      currentTarget
    }) => updateFilterValueRegExp(componentFilter, currentTarget.value),
    value: componentFilter.value
  })), /*#__PURE__*/react["createElement"]("td", {
    className: SettingsShared_default.a.TableCell
  }, /*#__PURE__*/react["createElement"](Button_Button, {
    onClick: () => removeFilter(index),
    title: "Delete filter"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "delete"
  }))))))), /*#__PURE__*/react["createElement"](Button_Button, {
    onClick: addFilter
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    className: SettingsShared_default.a.ButtonIcon,
    type: "add"
  }), "Add filter"));
}