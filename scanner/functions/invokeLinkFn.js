function invokeLinkFn(linkFn, scope, $element, attrs, controllers, transcludeFn) {
      try {
        linkFn(scope, $element, attrs, controllers, transcludeFn);
      } catch (e) {
        $exceptionHandler(e, startingTag($element));
      }
    }