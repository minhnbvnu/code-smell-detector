function errorsToSend(errors) {
  return toArray(errors).map((error) => ({ property: error.property }));
}