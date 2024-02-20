function streamInError() {
      suspenseNode.data = '$!';
      if (suspenseNode._reactRetry) {
        suspenseNode._reactRetry();
      }
    }