function decorateStory(storyFn, decorator, bindWithContext) {
  // Bind the partially decorated storyFn so that when it is called it always knows about the story context,
  // no matter what it is passed directly. This is because we cannot guarantee a decorator will
  // pass the context down to the next decorated story in the chain.
  var boundStoryFunction = bindWithContext(storyFn);
  return function (context) {
    return decorator(boundStoryFunction, context);
  };
}