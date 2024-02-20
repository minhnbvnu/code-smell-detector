function flushBundle() {
            if (currentBundle.length > 0) {
              bundleAssets.push(makeBundle(currentBundle, relationType));
              currentBundle = [];
            }
          }