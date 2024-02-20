function Reentrant() {
        reentrantMarkup = ReactDOMServer.renderToString(
          <App value={1} reentrant={false} />,
        );
        return null;
      }