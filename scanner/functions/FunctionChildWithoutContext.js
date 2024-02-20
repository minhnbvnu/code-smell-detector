function FunctionChildWithoutContext(props, context) {
        // this should render blank; context isn't passed to this component.
        return <div>{context.text}</div>;
      }