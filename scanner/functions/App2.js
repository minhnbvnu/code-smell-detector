function App2() {
      return (
        <Child2>
          {ReactDOMServer.renderToString(<blink ariaTypo2="no" />)}
        </Child2>
      );
    }