function partToTOC(part, toc) {
        _.each(part.files, function(file) {
          // if this has no label, they are direct children.
          // I should probably use a .part flag instead.
          if (!file.label) {
            // loop through each vinyl file and find the corresponding
            // tocFile. Then assign sections to current toc parent.
            _.each(file.vinyls, function(vinyl) {
              var tocFile = _.find(tocFiles, function(f) {
                return f.file.history[0] == vinyl.history[0];
              });
              if (tocFile && !_.isEmpty(tocFile.sections)) {
                toc.children = toc.children.concat(tocFile.sections);
              }
            });
          }

          // This is a part and we need to handle it by calling
          // partToTOC. This removes the ability to add extra config
          // to part config. Rethink.
          else {
            var child = { type: "part", label: file.label, children: [] };
            partToTOC(file, child);
            toc.children.push(child);
          }
        });
      }