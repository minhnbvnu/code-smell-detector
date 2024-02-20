function restoreReadFileContext(binding) {
  delete readFileContextPrototype._mockedBinding;
}