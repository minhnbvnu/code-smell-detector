function SearchInput_SearchInput({
  goToNextResult,
  goToPreviousResult,
  placeholder,
  search,
  searchIndex,
  searchResultsCount,
  searchText,
  testName
}) {
  const inputRef = Object(react["useRef"])(null);

  const resetSearch = () => search(''); // $FlowFixMe[missing-local-annot]


  const handleChange = ({
    currentTarget
  }) => {
    search(currentTarget.value);
  }; // $FlowFixMe[missing-local-annot]


  const handleKeyPress = ({
    key,
    shiftKey
  }) => {
    if (key === 'Enter') {
      if (shiftKey) {
        goToPreviousResult();
      } else {
        goToNextResult();
      }
    }
  }; // Auto-focus search input


  Object(react["useEffect"])(() => {
    if (inputRef.current === null) {
      return () => {};
    }

    const handleKeyDown = event => {
      const {
        key,
        metaKey
      } = event;

      if (key === 'f' && metaKey) {
        if (inputRef.current !== null) {
          inputRef.current.focus();
          event.preventDefault();
          event.stopPropagation();
        }
      }
    }; // It's important to listen to the ownerDocument to support the browser extension.
    // Here we use portals to render individual tabs (e.g. Profiler),
    // and the root document might belong to a different window.


    const ownerDocument = inputRef.current.ownerDocument;
    ownerDocument.addEventListener('keydown', handleKeyDown);
    return () => ownerDocument.removeEventListener('keydown', handleKeyDown);
  }, []);
  return /*#__PURE__*/react["createElement"]("div", {
    className: SearchInput_default.a.SearchInput,
    "data-testname": testName
  }, /*#__PURE__*/react["createElement"](Icon_Icon, {
    className: SearchInput_default.a.InputIcon,
    type: "search"
  }), /*#__PURE__*/react["createElement"]("input", {
    "data-testname": testName ? `${testName}-Input` : undefined,
    className: SearchInput_default.a.Input,
    onChange: handleChange,
    onKeyPress: handleKeyPress,
    placeholder: placeholder,
    ref: inputRef,
    value: searchText
  }), !!searchText && /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("span", {
    className: SearchInput_default.a.IndexLabel,
    "data-testname": testName ? `${testName}-ResultsCount` : undefined
  }, Math.min(searchIndex + 1, searchResultsCount), " |", ' ', searchResultsCount), /*#__PURE__*/react["createElement"]("div", {
    className: SearchInput_default.a.LeftVRule
  }), /*#__PURE__*/react["createElement"](Button_Button, {
    "data-testname": testName ? `${testName}-PreviousButton` : undefined,
    className: SearchInput_default.a.IconButton,
    disabled: !searchText,
    onClick: goToPreviousResult,
    title: /*#__PURE__*/react["createElement"](react["Fragment"], null, "Scroll to previous search result (", /*#__PURE__*/react["createElement"]("kbd", null, "Shift"), " +", ' ', /*#__PURE__*/react["createElement"]("kbd", null, "Enter"), ")")
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "up"
  })), /*#__PURE__*/react["createElement"](Button_Button, {
    "data-testname": testName ? `${testName}-NextButton` : undefined,
    className: SearchInput_default.a.IconButton,
    disabled: !searchText,
    onClick: goToNextResult,
    title: /*#__PURE__*/react["createElement"](react["Fragment"], null, "Scroll to next search result (", /*#__PURE__*/react["createElement"]("kbd", null, "Enter"), ")")
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "down"
  })), /*#__PURE__*/react["createElement"](Button_Button, {
    "data-testname": testName ? `${testName}-ResetButton` : undefined,
    className: SearchInput_default.a.IconButton,
    disabled: !searchText,
    onClick: resetSearch,
    title: "Reset search"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "close"
  }))));
}