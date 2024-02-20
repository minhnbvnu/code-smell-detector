function createLinkWithType(type) {
      // This is done after prepare() to use the adjusted file.base property
      if (isRelative && type !== 'junction') {
        file.symlink = path.relative(file.base, file.symlink);
      }

      var opts = {
        flags: flags,
        type: type,
      };
      fo.symlink(file.symlink, file.path, opts, onSymlink);
    }