function expectDeprecationWarningWithFiber(callback) {
      expect(callback).toLowPriorityWarnDev(
        'render(): Calling ReactDOM.render() to hydrate server-rendered markup ' +
          'will stop working in React v17. Replace the ReactDOM.render() call ' +
          'with ReactDOM.hydrate() if you want React to attach to the server HTML.',
        {withoutStack: true},
      );
    }