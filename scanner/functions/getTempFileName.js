function getTempFileName(suffix) {
  return os.tmpdir() + path.sep + os.uptime() + suffix;
}