function saveItems(showalert) {
    NVR.flushAPICache()
    .then (function() {
      _saveItems(showalert);
    })
    .catch (function(err) {
      NVR.debug('Error clearing cache:'+JSON.stringify(err));
      _saveItems(showalert);
    });
  }