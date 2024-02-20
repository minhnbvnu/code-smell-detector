function parseStories(story_details) {
    if (angular.isUndefined(story_details) || story_details === null) return;
    const lines = story_details.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const currentLine = lines[i];
      if (currentLine.startsWith('##')) {
        $scope.storiesList.push(currentLine.substring(2, currentLine.length));
      }
    }
  }