function InspectedElementErrorBoundaryWrapper({
  children
}) {
  // Key on the selected element ID so that changing the selected element automatically hides the boundary.
  // This seems best since an error inspecting one element isn't likely to be relevant to another element.
  const {
    selectedElementID
  } = Object(react["useContext"])(TreeStateContext);
  const refresh = Object(react["unstable_useCacheRefresh"])();
  const handleDsmiss = Object(react["useCallback"])(() => {
    clearCacheBecauseOfError(refresh);
  }, [refresh]);
  return /*#__PURE__*/react["createElement"]("div", {
    className: InspectedElementErrorBoundary_default.a.Wrapper
  }, /*#__PURE__*/react["createElement"](views_ErrorBoundary, {
    key: selectedElementID,
    canDismiss: true,
    onBeforeDismissCallback: handleDsmiss
  }, children));
}