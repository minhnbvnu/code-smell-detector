function doExFn(cm) {
      return function(command) {
        cm.openDialog = helpers.fakeOpenDialog(command);
        helpers.doKeys(':');
      }
    }