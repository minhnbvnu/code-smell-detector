function recordFs(shim, fn, name) {
    return { name: NAMES.FS.PREFIX + name, callback: shim.LAST, recorder: record }
  }