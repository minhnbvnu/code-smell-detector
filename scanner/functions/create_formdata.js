function create_formdata() {
      var fd = new FormData();
      for (var i = 0; i < arguments.length; i++) {
        fd.append.apply(fd, arguments[i]);
      };
      return fd;
    }