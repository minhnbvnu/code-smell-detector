function TabBar_TabBar({
  currentTab,
  disabled = false,
  id: groupName,
  selectTab,
  tabs,
  type
}) {
  if (!tabs.some(tab => tab !== null && tab.id === currentTab)) {
    const firstTab = tabs.find(tab => tab !== null);
    selectTab(firstTab.id);
  }

  const onChange = Object(react["useCallback"])(({
    currentTarget
  }) => selectTab(currentTarget.value), [selectTab]);
  const handleKeyDown = Object(react["useCallback"])(event => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
        event.stopPropagation();
        break;

      default:
        break;
    }
  }, []);
  let iconSizeClassName;
  let tabLabelClassName;
  let tabSizeClassName;

  switch (type) {
    case 'navigation':
      iconSizeClassName = TabBar_default.a.IconSizeNavigation;
      tabLabelClassName = TabBar_default.a.TabLabelNavigation;
      tabSizeClassName = TabBar_default.a.TabSizeNavigation;
      break;

    case 'profiler':
      iconSizeClassName = TabBar_default.a.IconSizeProfiler;
      tabLabelClassName = TabBar_default.a.TabLabelProfiler;
      tabSizeClassName = TabBar_default.a.TabSizeProfiler;
      break;

    case 'settings':
      iconSizeClassName = TabBar_default.a.IconSizeSettings;
      tabLabelClassName = TabBar_default.a.TabLabelSettings;
      tabSizeClassName = TabBar_default.a.TabSizeSettings;
      break;

    default:
      throw Error(`Unsupported type "${type}"`);
  }

  return /*#__PURE__*/react["createElement"](react["Fragment"], null, tabs.map(tab => {
    if (tab === null) {
      return /*#__PURE__*/react["createElement"]("div", {
        key: "VRule",
        className: TabBar_default.a.VRule
      });
    }

    const {
      icon,
      id,
      label,
      title
    } = tab;
    let button = /*#__PURE__*/react["createElement"]("label", {
      className: [tabSizeClassName, disabled ? TabBar_default.a.TabDisabled : TabBar_default.a.Tab, !disabled && currentTab === id ? TabBar_default.a.TabCurrent : ''].join(' '),
      "data-testname": `TabBarButton-${id}`,
      key: id,
      onKeyDown: handleKeyDown,
      onMouseDown: () => selectTab(id)
    }, /*#__PURE__*/react["createElement"]("input", {
      type: "radio",
      className: TabBar_default.a.Input,
      checked: currentTab === id,
      disabled: disabled,
      name: groupName,
      value: id,
      onChange: onChange
    }), /*#__PURE__*/react["createElement"](Icon_Icon, {
      className: `${disabled ? TabBar_default.a.IconDisabled : ''} ${iconSizeClassName}`,
      type: icon
    }), /*#__PURE__*/react["createElement"]("span", {
      className: tabLabelClassName
    }, label));

    if (title) {
      button = /*#__PURE__*/react["createElement"](reach_ui_tooltip, {
        key: id,
        label: title
      }, button);
    }

    return button;
  }));
}