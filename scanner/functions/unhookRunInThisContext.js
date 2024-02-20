function unhookRunInThisContext() {
    vm.runInThisContext = originalRunInThisContext;
}