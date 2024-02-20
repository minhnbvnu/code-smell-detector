function portaledContent(Component) {
  return function PortaledContent({
    portalContainer,
    ...rest
  }) {
    const store = Object(react["useContext"])(StoreContext);
    let children = /*#__PURE__*/react["createElement"](views_ErrorBoundary, {
      store: store
    }, /*#__PURE__*/react["createElement"](Component, rest));

    if (portalContainer != null) {
      // The ThemeProvider works by writing DOM style variables to an HTMLDivElement.
      // Because Portals render in a different DOM subtree, these variables don't propagate.
      // So in this case, we need to re-wrap portaled content in a second ThemeProvider.
      children = /*#__PURE__*/react["createElement"](ThemeProvider, null, /*#__PURE__*/react["createElement"]("div", {
        "data-react-devtools-portal-root": true,
        style: {
          width: '100vw',
          height: '100vh'
        }
      }, children));
    }

    return portalContainer != null ? /*#__PURE__*/Object(react_dom["createPortal"])(children, portalContainer) : children;
  };
}