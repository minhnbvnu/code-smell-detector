function treeToStreams(parent, streams) {

  if(_.isEmpty(parent.files)) return streams;

  if(isStringArray(parent.files)) {
    parent.vinyls = [];
    var stream = vfs.src(parent.files)
      .pipe(through.obj(function(file, enc, cb) {

        // set the parent on the vinyl file so we
        // can get it in the TOC
        file.parent = parent.parent;

        // Set the vars from the parent so they are
        // accessible in liquid.
        if(parent.parent.vars) {
          _.set(file, "pageLocals.part", parent.parent.vars);
          _.set(file, "layoutLocals.part", parent.parent.vars);
        }

        // save the file in vinyls array for TOC.
        parent.vinyls.push(file);

        debug(file.path, file.contents.toString().substring(0, 20));

        cb(null, file);

      }));
    streams.push(stream);
  }
  else {
    _.each(parent.files, function(file) {
      treeToStreams(file, streams);
    });
  }

  return streams;
}