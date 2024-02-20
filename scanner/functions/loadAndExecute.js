function loadAndExecute(canvas, sources) {
      var code = [], errors = [], sourcesCount = sources.length, loaded = 0;

      function ajaxAsync(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            var error;
            if (xhr.status !== 200 && xhr.status !== 0) {
              error = "Invalid XHR status " + xhr.status;
            } else if (xhr.responseText === "") {
              error = "No content";
            }
            callback(xhr.responseText, error);
          }
        };
        xhr.open("GET", url, true);
        if (xhr.overrideMimeType) {
          xhr.overrideMimeType("application/json");
        }
        xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 1960 00:00:00 GMT"); // no cache
        xhr.send(null);
      }

      function loadBlock(index, filename) {
        ajaxAsync(filename, function (block, error) {
          code[index] = block;
          ++loaded;
          if (error) {
            errors.push("  " + filename + " ==> " + error);
          }
          if (loaded === sourcesCount) {
            if (errors.length === 0) {
              try {
                return new Processing(canvas, code.join("\n"));
              } catch(e) {
                Processing.logger.log("Unable to execute pjs sketch: " + e);
              }
            } else {
              Processing.logger.log("Unable to load pjs sketch files:\n" + errors.join("\n"));
            }
          }
        });
      }

      for (var i = 0; i < sourcesCount; ++i) {
        loadBlock(i, sources[i]);
      }
    }