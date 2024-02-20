function overrideReadFileContext(binding) {
  readFileContextPrototype._mockedBinding = binding;
}