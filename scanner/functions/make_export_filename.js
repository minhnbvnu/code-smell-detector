function make_export_filename(space, extension) {
  return space.name.replace(/[^\w]/g, '') + "-" + space._id + "-" + moment().format("YYYYMMDD-HH-mm-ss") + "." + extension;
}