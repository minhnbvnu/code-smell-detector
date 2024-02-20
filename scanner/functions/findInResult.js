function findInResult(result, element) {
        for (var i = 0; i < result.length; i++) {
          if (result[i] === element) return true;
        }
        return false;
      }