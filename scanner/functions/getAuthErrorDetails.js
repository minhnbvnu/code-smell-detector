function getAuthErrorDetails(err) {
  var details = [];
  try {
    details = err.response.body.error.details;
  } catch (e) { e; }
  return details;
}