function abort() {
  if (activeService) {
    activeService.destroy();
    dispatchEvent("afterprint");
  }
}