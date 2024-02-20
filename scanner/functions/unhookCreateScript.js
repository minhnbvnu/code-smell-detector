function unhookCreateScript() {
    vm.createScript = originalCreateScript;
}