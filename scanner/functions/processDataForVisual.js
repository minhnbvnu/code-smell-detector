function processDataForVisual(mdData) {
    const lines = mdData.split('\n');
    const graphArr = [];
    let storyFlow = '';
    let story_line_count = 0;
    for (let i = 0; i < lines.length; i++) {
      const currentLine = lines[i];
      if (currentLine.startsWith('##')) {
        //got a new story.
        //push the old story if there is one.
        if (storyFlow.length > 0) {
          storyFlow = storyFlow.substring(0, storyFlow.lastIndexOf(';') + 1);
          graphArr.push(storyFlow);
          storyFlow = '';
          story_line_count = 0;
        }
        continue;
      } else if (currentLine.startsWith('*')) {
        //story:intent {entities}
        let currentIntent,
          entities = '';
        if (currentLine.indexOf('{') !== -1) {
          //contains entities
          currentIntent = currentLine.substring(2, currentLine.indexOf('{'));
          entities = currentLine.substring(
            currentLine.indexOf('{'),
            currentLine.indexOf('}')
          );
        } else {
          currentIntent = currentLine.substring(2, currentLine.length);
        }
        if (story_line_count !== 0) {
          //first action for the story
          storyFlow = storyFlow + currentIntent + ';';
        }
        storyFlow = storyFlow + currentIntent + '-->';
      } else if (
        currentLine.startsWith('\t-') ||
        currentLine.startsWith('  -')
      ) {
        //story:intent:action
        storyFlow =
          storyFlow +
          currentLine.substring(
            currentLine.indexOf('-') + 2,
            currentLine.length
          ) +
          '((' +
          currentLine.substring(
            currentLine.indexOf('-') + 2,
            currentLine.length
          ) +
          '));';
        storyFlow =
          storyFlow +
          currentLine.substring(
            currentLine.indexOf('-') + 2,
            currentLine.length
          ) +
          '-->';
      }
      story_line_count++;
    }
    //process last story
    storyFlow = storyFlow.substring(0, storyFlow.lastIndexOf(';') + 1);
    graphArr.push(storyFlow);

    $scope.graphData = 'graph TD;' + graphArr.join('');
  }