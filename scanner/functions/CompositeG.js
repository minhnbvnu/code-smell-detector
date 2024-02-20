function CompositeG(props) {
      // Make sure namespace passes through composites
      return <g>{props.children}</g>;
    }