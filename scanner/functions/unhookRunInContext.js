function unhookRunInContext() {
    vm.runInContext = originalRunInContext;
}