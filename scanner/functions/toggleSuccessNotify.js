function toggleSuccessNotify() {
    if (!!options.success) {
      grunt.util.hooker.hook(grunt.log, 'success', notifyHook);
    } else {
      grunt.util.hooker.unhook(grunt.log, 'success');
    }
  }