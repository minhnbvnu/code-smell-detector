function ReporterError(path, msg) {
  this.path = path;
  this.rethrow(msg);
}