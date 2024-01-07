function Effecty() {
      React.useEffect(() => {
        log.push('called');
      }, []);
      return null;
    }