function TransformError() {
  Error.captureStackTrace && Error.captureStackTrace(this, TransformError);
}