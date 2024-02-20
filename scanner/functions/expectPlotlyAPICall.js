function expectPlotlyAPICall(method, props, defaultArgs) {
    expect(method).toHaveBeenCalledWith(
      expect.anything(),
      Object.assign(
        defaultArgs || {
          data: [],
          config: undefined, // eslint-disable-line no-undefined
          layout: undefined, // eslint-disable-line no-undefined
          frames: undefined, // eslint-disable-line no-undefined
        },
        props || {}
      )
    );
  }