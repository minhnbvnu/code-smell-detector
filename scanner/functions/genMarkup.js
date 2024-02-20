function genMarkup(props) {
      return ReactDOMServer.renderToString(<div {...props} />);
    }