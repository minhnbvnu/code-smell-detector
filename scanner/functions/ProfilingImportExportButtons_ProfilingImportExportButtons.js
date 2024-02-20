function ProfilingImportExportButtons_ProfilingImportExportButtons() {
  const {
    isProfiling,
    profilingData,
    rootID
  } = Object(react["useContext"])(ProfilerContext);
  const {
    setFile
  } = Object(react["useContext"])(TimelineContext);
  const store = Object(react["useContext"])(StoreContext);
  const {
    profilerStore
  } = store;
  const inputRef = Object(react["useRef"])(null);
  const downloadRef = Object(react["useRef"])(null);
  const {
    dispatch: modalDialogDispatch
  } = Object(react["useContext"])(ModalDialogContext);
  const doesHaveInMemoryData = profilerStore.didRecordCommits;
  const downloadData = Object(react["useCallback"])(() => {
    if (rootID === null) {
      return;
    }

    const anchorElement = downloadRef.current;

    if (profilingData !== null && anchorElement !== null) {
      const profilingDataExport = prepareProfilingDataExport(profilingData);
      const date = new Date();
      const dateString = date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');
      const timeString = date.toLocaleTimeString(undefined, {
        hour12: false
      }).replace(/:/g, '-');
      downloadFile(anchorElement, `profiling-data.${dateString}.${timeString}.json`, JSON.stringify(profilingDataExport, null, 2));
    }
  }, [rootID, profilingData]);
  const clickInputElement = Object(react["useCallback"])(() => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  }, []); // TODO (profiling) We should probably use a transition for this and suspend while loading the file.
  // Local files load so fast it's probably not very noticeable though.

  const handleChange = () => {
    const input = inputRef.current;

    if (input !== null && input.files.length > 0) {
      const file = input.files[0]; // TODO (profiling) Handle fileReader errors.

      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        const raw = fileReader.result;
        const json = JSON.parse(raw);

        if (!Object(shared_isArray["a" /* default */])(json) && shared_hasOwnProperty["a" /* default */].call(json, 'version')) {
          // This looks like React profiling data.
          // But first, clear any User Timing marks; we should only have one type open at a time.
          setFile(null);

          try {
            const profilingDataExport = json;
            profilerStore.profilingData = prepareProfilingDataFrontendFromExport(profilingDataExport);
          } catch (error) {
            modalDialogDispatch({
              id: 'ProfilingImportExportButtons',
              type: 'SHOW',
              title: 'Import failed',
              content: /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", null, "The profiling data you selected cannot be imported."), error !== null && /*#__PURE__*/react["createElement"]("div", {
                className: ProfilingImportExportButtons_default.a.ErrorMessage
              }, error.message))
            });
          }
        } else {
          // Otherwise let's assume this is Trace Event data and pass it to the Timeline preprocessor.
          // But first, clear React profiling data; we should only have one type open at a time.
          profilerStore.clear(); // TODO (timeline) We shouldn't need to re-open the File but we'll need to refactor to avoid this.

          setFile(file);
        }
      });
      fileReader.readAsText(file);
    }
  };

  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: ProfilingImportExportButtons_default.a.VRule
  }), /*#__PURE__*/react["createElement"]("input", {
    ref: inputRef,
    className: ProfilingImportExportButtons_default.a.Input,
    type: "file",
    accept: ".json",
    onChange: handleChange,
    tabIndex: -1
  }), /*#__PURE__*/react["createElement"]("a", {
    ref: downloadRef,
    className: ProfilingImportExportButtons_default.a.Input
  }), /*#__PURE__*/react["createElement"](Button_Button, {
    disabled: isProfiling,
    onClick: clickInputElement,
    title: "Load profile..."
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "import"
  })), /*#__PURE__*/react["createElement"](Button_Button, {
    disabled: isProfiling || !doesHaveInMemoryData,
    onClick: downloadData,
    title: "Save profile..."
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "export"
  })));
}