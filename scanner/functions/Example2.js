function Example2({n}) {
      React.useEffect(() => {
        ReactDOM.render(<Example3 n={n} />, container3);
      });
      return 2 * n;
    }