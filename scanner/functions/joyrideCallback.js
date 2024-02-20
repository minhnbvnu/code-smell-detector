function joyrideCallback({ lifecycle, step: { target } }) {
    if (lifecycle === 'tooltip') {
      trackHelpClick(target);
    }
  }