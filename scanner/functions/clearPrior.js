function clearPrior() {
      // return the reporter
      var oldReporter = find('');
      
      if(oldReporter) {
        getContainer().removeChild(oldReporter);
      }
    }