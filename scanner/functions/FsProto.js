function FsProto(options) {
  this.dataDir = path.resolve((0 === options.data_dir.indexOf('/') ? options.data_dir : options.basePath + '/../' + options.data_dir));
  this.tmpDir = options.data_dir + '/tmp';
  this.permDir = options.data_dir + '/perm';
}