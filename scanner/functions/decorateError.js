function decorateError(error) {
  if (
    error.response &&
    error.response.body &&
    Array.isArray(error.response.body.errors)
  ) {
    const first = error.response.body.errors[0];

    error.locations = first.locations;
    error.path = first.path;
    error.extensions = first.extensions;
  }

  return error;
}