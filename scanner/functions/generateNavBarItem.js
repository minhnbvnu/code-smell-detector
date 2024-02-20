function generateNavBarItem(html) {
    if (html) {
      // every time a view enters we need to recreate its view buttons if they exist
      return $compile(html)($scope.$new());
    }
  }