function createRoot(children, loc = locStub) {
    return {
      type: 0,
      children,
      helpers: /* @__PURE__ */ new Set(),
      components: [],
      directives: [],
      hoists: [],
      imports: [],
      cached: 0,
      temps: 0,
      codegenNode: void 0,
      loc
    };
  }