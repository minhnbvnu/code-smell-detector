function vm_memory() {
  var size = Math.floor(os.totalmem() / 1024 / 1024 / 6);
  return Math.max(size, 512);
}