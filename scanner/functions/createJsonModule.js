function createJsonModule(id) {
    const module = createModule(id, []);
    module.isJSON.mockReturnValue(true);
    return module;
  }