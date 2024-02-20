function describeSupport(input) {
  switch (input) {
    case 'no': {
      return {
        className: 'no-support',
        description: `<span class="support">no support</span>`,
      };
    }
    case 'yes': {
      return {
        className: 'has-support',
        description: `<span class="support">supported</span>`,
      };
    }
    case 'partial': {
      return {
        className: 'partial-support',
        description: `<span class="support">partially supported</span>`,
      };
    }
    default: {
      return {
        className: 'has-support',
        description: `<span class="support">supported since version <span class="version">${input}</span></span>`,
      };
    }
  }
}