function handleFileSelect(evt) {
        // These are the files
        var files = evt.target.files;
        // Load each one and trigger a callback
        for (var i = 0; i < files.length; i++) {
          var f = files[i];
          var reader = new FileReader();
          function makeLoader(theFile) {
            // Making a p5.File object
            var p5file = new p5.File(theFile);
            return function(e) {
              p5file.data = e.target.result;
              callback(p5file);
            };
          };
          reader.onload = makeLoader(f);

          // Text or data?
          // This should likely be improved
          if (f.type.indexOf('text') > -1) {
            reader.readAsText(f);
          } else {
            reader.readAsDataURL(f);
          }
        }
      }