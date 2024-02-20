function syncUrl() {
      if ($location.url() !== currentLocation) {
        $location.url(currentLocation);
        $location.replace();
      }
    }