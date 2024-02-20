function shouldTrackError(statusCode, config) {
  return (
    statusCode > 0 &&
    config.grpc.record_errors &&
    !config.grpc.ignore_status_codes.includes(statusCode)
  )
}