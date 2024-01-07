function unmountComponent(node) {
    // ReactDOM was moved into a separate package in 0.14
    if (needsReactDOM) {
      ReactDOM.unmountComponentAtNode(node);
    } else if (React.unmountComponentAtNode) {
      React.unmountComponentAtNode(node);
    } else {
      // Unmounting for React 0.4 and lower
      React.unmountAndReleaseReactRootNode(node);
    }
  }