function CannotSuspendWarningMessage() {
  const store = Object(react["useContext"])(StoreContext);
  const areSuspenseElementsHidden = !!store.componentFilters.find(filter => filter.type === types["b" /* ComponentFilterElementType */] && filter.value === types["n" /* ElementTypeSuspense */] && filter.isEnabled); // Has the user filtered out Suspense nodes from the tree?
  // If so, the selected element might actually be in a Suspense tree after all.

  if (areSuspenseElementsHidden) {
    return /*#__PURE__*/react["createElement"]("div", null, "Suspended state cannot be toggled while Suspense components are hidden. Disable the filter and try again.");
  } else {
    return /*#__PURE__*/react["createElement"]("div", null, "The selected element is not within a Suspense container. Suspending it would cause an error.");
  }
}