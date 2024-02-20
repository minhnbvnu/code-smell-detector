function createHookArguments(el = document.createElement('div'), binding = {}) {
  return [
    el,
    merge(
      {
        value: {
          handler: () => jest.fn(),
          events: ['dblclick'],
          middleware: () => jest.fn(),
          isActive: undefined,
          detectIframe: undefined,
        },
      },
      binding,
    ),
  ]
}