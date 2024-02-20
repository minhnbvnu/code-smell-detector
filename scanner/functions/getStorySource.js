function getStorySource(story) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    tabStop: 2,
    sortProps: true,
    maxInlineAttributesLineLength: 100
  };
  var storySource = story && story.props && story.props.children;
  var stringifiedSource = storySource ? (0, _reactElementToJsxString.default)(storySource, options) : '';
  return processMd('```jsx\n' + stringifiedSource + '\n```');
}