function InnerReactApp() {
      return (
        <div
          ref={innerRef}
          onClick={track('inner bubble')}
          onClickCapture={track('inner capture')}
        />
      );
    }