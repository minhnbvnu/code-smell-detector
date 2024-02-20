function scheduleRendering() {
          if (!renderScheduled) {
            scope.$$postDigest(render);
            renderScheduled = true;
          }
        }