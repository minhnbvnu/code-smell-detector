function OuterReactApp() {
      return (
        <div
          ref={outerRef}
          onClick={track('outer bubble')}
          onClickCapture={track('outer capture')}
        />
      );
    }