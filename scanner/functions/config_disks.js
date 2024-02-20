function config_disks(name, boot, data) {
  var use_link = true;

  var storage_opts = [
    "storagectl"   , name  ,
    "--name"       , "SATA",
    "--add"        , "sata",
    "--hostiocache", "on"  ,
  ];

  var storage_boot = [
    "storageattach", name  ,
    "--storagectl" , "SATA",
    "--port"       , "0"   ,
    "--device"     , "0"   ,
    "--type"       , "dvddrive",
    "--medium"     , boot  ,
  ];

  var data_link   = `${data}.link`;
  var data_origin = path.join("./", path.basename(data));
  var storage_data = [
    "storageattach", name  ,
    "--storagectl" , "SATA",
    "--port"       , "1"   ,
    "--device"     , "0"   ,
    "--type"       , "hdd" ,
    "--medium"     , use_link ? data_link : data,
  ];

  return async(function* () {
    if (!(yield fsAsync.exists(data))) {
      var file   = data + ".tmp";
      var origin = config("agent:vm:blank_disk");
      yield Utils.unzip(origin, file).catch((err) => {
        throw new Error('Invalid disk file ' + origin + ', err: ' + err);
      });
      yield hdds.clonehd(file, data);
    }

    if (use_link) {
      yield fsAsync.remove(data_link).catch(() => {});
      yield fsAsync.symlink(data_origin, data_link, 'file');
    }

    yield exec.apply(null, storage_opts);
    yield exec.apply(null, storage_boot);
    yield exec.apply(null, storage_data);
  });
}