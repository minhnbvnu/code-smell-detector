function writeNative(node, nativeElement, objectStack) {
  if (nativeElement.vendorId) {
    node.setAttribute('vendorId', nativeElement.vendorId);
  }
  if (nativeElement.safeToIgnore !== undefined) {
    node.setAttribute('safeToIgnore', String(nativeElement.safeToIgnore));
  }
  if (nativeElement.value !== undefined) {
    writeStringTextNode(node, nativeElement.value);
  }
}