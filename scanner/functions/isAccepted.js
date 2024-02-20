function isAccepted(id) {
      var accepted = scope.cache[id].__accepted;
      scope.cache[id].__accepted = false;
      if (accepted === true) {
        console.log(" > Manually accepted")
      }
      return accepted === true;
    }