function uploadFile(evt) {
      gapi.client.load('drive', 'v2', function() {
        var file = evt.target.files[0];
        insertFile(file);
      });
    }