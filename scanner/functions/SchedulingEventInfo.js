function SchedulingEventInfo({
  eventInfo
}) {
  const {
    viewUrlSourceFunction
  } = Object(react["useContext"])(Components_ViewSourceContext);
  const {
    componentName,
    timestamp
  } = eventInfo;
  const componentStack = eventInfo.componentStack || null;

  const viewSource = source => {
    if (viewUrlSourceFunction != null && source != null) {
      viewUrlSourceFunction(...source);
    }
  };

  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: SidebarEventInfo_default.a.Toolbar
  }, componentName, " ", getSchedulingEventLabel(eventInfo)), /*#__PURE__*/react["createElement"]("div", {
    className: SidebarEventInfo_default.a.Content,
    tabIndex: 0
  }, /*#__PURE__*/react["createElement"]("ul", {
    className: SidebarEventInfo_default.a.List
  }, /*#__PURE__*/react["createElement"]("li", {
    className: SidebarEventInfo_default.a.ListItem
  }, /*#__PURE__*/react["createElement"]("label", {
    className: SidebarEventInfo_default.a.Label
  }, "Timestamp"), ":", ' ', /*#__PURE__*/react["createElement"]("span", {
    className: SidebarEventInfo_default.a.Value
  }, formatTimestamp(timestamp))), componentStack && /*#__PURE__*/react["createElement"]("li", {
    className: SidebarEventInfo_default.a.ListItem
  }, /*#__PURE__*/react["createElement"]("div", {
    className: SidebarEventInfo_default.a.Row
  }, /*#__PURE__*/react["createElement"]("label", {
    className: SidebarEventInfo_default.a.Label
  }, "Rendered by"), /*#__PURE__*/react["createElement"](Button_Button, {
    onClick: () => Object(clipboard["copy"])(componentStack),
    title: "Copy component stack to clipboard"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "copy"
  }))), /*#__PURE__*/react["createElement"]("ul", {
    className: SidebarEventInfo_default.a.List
  }, stackToComponentSources(componentStack).map(([displayName, source], index) => {
    return /*#__PURE__*/react["createElement"]("li", {
      key: index
    }, /*#__PURE__*/react["createElement"](Button_Button, {
      className: source ? SidebarEventInfo_default.a.ClickableSource : SidebarEventInfo_default.a.UnclickableSource,
      disabled: !source,
      onClick: () => viewSource(source)
    }, displayName));
  }))))));
}