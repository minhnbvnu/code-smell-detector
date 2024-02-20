function digestClassCounts(classes, count) {
          // Use createMap() to prevent class assumptions involving property
          // names in Object.prototype
          var classCounts = element.data('$classCounts') || createMap();
          var classesToUpdate = [];
          forEach(classes, function(className) {
            if (count > 0 || classCounts[className]) {
              classCounts[className] = (classCounts[className] || 0) + count;
              if (classCounts[className] === +(count > 0)) {
                classesToUpdate.push(className);
              }
            }
          });
          element.data('$classCounts', classCounts);
          return classesToUpdate.join(' ');
        }