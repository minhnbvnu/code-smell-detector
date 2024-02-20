function BrokenComponentWillMountWithContext() {
      return {
        getChildContext() {
          return {foo: 42};
        },
        render() {
          return <div>{this.props.children}</div>;
        },
        UNSAFE_componentWillMount() {
          throw new Error('Hello');
        },
      };
    }