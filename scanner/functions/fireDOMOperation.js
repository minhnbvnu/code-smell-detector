function fireDOMOperation() {
          if (!fireDOMOperation.hasBeenRun) {
            fireDOMOperation.hasBeenRun = true;
            domOperation();
          }
        }