function create_formdata_set() {
      var fd = new FormData();
      for (var i = 0; i < arguments.length; i++) {
        fd.set.apply(fd, arguments[i]);
      };
      return fd;
    }