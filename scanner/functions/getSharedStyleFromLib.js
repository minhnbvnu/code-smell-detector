function getSharedStyleFromLib(context, sharedStyle, originLibrary) {
  const librairiesController = AppController.sharedInstance().librariesController()
  const shareableObjectReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(sharedStyle, originLibrary);
  return librairiesController.importShareableObjectReference_intoDocument(shareableObjectReference, context.document.documentData());
}