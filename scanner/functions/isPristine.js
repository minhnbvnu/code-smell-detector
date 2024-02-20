function isPristine() {
    return Object.keys(state.current.pristine).every(
      key => !!state.current.pristine[key],
    );
  }