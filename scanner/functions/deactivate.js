function deactivate() {
      // give tail 150ms to finish
      $timeout(function() {
        // deactivateCallback
        $element.removeClass('active refreshing refreshing-tail');
        if (activated) activated = false;
      }, 150);
    }