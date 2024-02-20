function relativeTOC(file, parent) {
        _.each(parent.children, function(child) {
          if (child.relative) {
            var href = "";
            if (config.format != "pdf") {
              var relativeFolder = path.relative(
                path.dirname(file.relative),
                path.dirname(child.relative)
              );
              href = path.join(relativeFolder, path.basename(child.relative));
            }
            if (child.id) {
              href += "#" + child.id;
            }
            child.href = href;
          }
          if (child.children) {
            child = relativeTOC(file, child);
          }
        });
        return parent;
      }