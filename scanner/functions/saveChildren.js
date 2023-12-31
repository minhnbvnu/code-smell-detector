function saveChildren(node) {
    node.children.forEach(function (child) {
      generateTutorial(
        'Tutorial: ' + child.title,
        child,
        helper.tutorialToUrl(child.name),
      );
      saveChildren(child);
    });
  }