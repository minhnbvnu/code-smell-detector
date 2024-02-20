function notFoundAlert(api) {
        editor.windowManager.alert('Could not find the specified string.', function () {
          api.focus('findtext');
        });
      }