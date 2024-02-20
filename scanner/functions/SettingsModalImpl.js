function SettingsModalImpl(_) {
  const {
    setIsModalShowing
  } = Object(react["useContext"])(SettingsModalContext);
  const dismissModal = Object(react["useCallback"])(() => setIsModalShowing(false), [setIsModalShowing]);
  const [selectedTabID, selectTab] = useLocalStorage('React::DevTools::selectedSettingsTabID', 'general');
  const modalRef = Object(react["useRef"])(null);
  useModalDismissSignal(modalRef, dismissModal);
  Object(react["useEffect"])(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }
  }, [modalRef]);
  let view = null;

  switch (selectedTabID) {
    case 'components':
      view = /*#__PURE__*/react["createElement"](ComponentsSettings, null);
      break;
    // $FlowFixMe[incompatible-type] is this missing in TabID?

    case 'debugging':
      view = /*#__PURE__*/react["createElement"](DebuggingSettings, null);
      break;

    case 'general':
      view = /*#__PURE__*/react["createElement"](GeneralSettings, null);
      break;

    case 'profiler':
      view = /*#__PURE__*/react["createElement"](ProfilerSettings, null);
      break;

    default:
      break;
  }

  return /*#__PURE__*/react["createElement"]("div", {
    className: SettingsModal_default.a.Background
  }, /*#__PURE__*/react["createElement"]("div", {
    className: SettingsModal_default.a.Modal,
    ref: modalRef
  }, /*#__PURE__*/react["createElement"]("div", {
    className: SettingsModal_default.a.Tabs
  }, /*#__PURE__*/react["createElement"](TabBar_TabBar, {
    currentTab: selectedTabID,
    id: "Settings",
    selectTab: selectTab,
    tabs: SettingsModal_tabs,
    type: "settings"
  }), /*#__PURE__*/react["createElement"]("div", {
    className: SettingsModal_default.a.Spacer
  }), /*#__PURE__*/react["createElement"](Button_Button, {
    onClick: dismissModal,
    title: "Close settings dialog"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "close"
  }))), /*#__PURE__*/react["createElement"]("div", {
    className: SettingsModal_default.a.Content
  }, view)));
}