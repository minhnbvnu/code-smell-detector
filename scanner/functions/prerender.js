function prerender() {
    setStatus('Generating markup');

    return Promise.resolve()
      .then(function () {
        const element = createElement(Fixture);

        // Server rendering moved to a separate package along with ReactDOM
        // in 0.14.0
        if (needsReactDOM) {
          return ReactDOMServer.renderToString(element);
        }

        // React.renderComponentToString was renamed in 0.12
        if (React.renderToString) {
          return React.renderToString(element);
        }

        // React.renderComponentToString became synchronous in React 0.9.0
        if (React.renderComponentToString.length === 1) {
          return React.renderComponentToString(element);
        }

        // Finally, React 0.4 and lower emits markup in a callback
        return new Promise(function (resolve) {
          React.renderComponentToString(element, resolve);
        });
      })
      .then(function (string) {
        output.innerHTML = string;
        setStatus('Markup only (No React)');
      })
      .catch(handleError);
  }