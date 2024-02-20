function closeParentClassBasedAnimations(startingElement) {
      var parentNode = getDomNode(startingElement);
      do {
        if (!parentNode || parentNode.nodeType !== ELEMENT_NODE) break;

        var animationDetails = activeAnimationsLookup.get(parentNode);
        if (animationDetails) {
          examineParentAnimation(parentNode, animationDetails);
        }

        parentNode = parentNode.parentNode;
      } while (true);

      // since animations are detected from CSS classes, we need to flush all parent
      // class-based animations so that the parent classes are all present for child
      // animations to properly function (otherwise any CSS selectors may not work)
      function examineParentAnimation(node, animationDetails) {
        // enter/leave/move always have priority
        if (animationDetails.structural || !hasAnimationClasses(animationDetails.options)) return;

        if (animationDetails.state === RUNNING_STATE) {
          animationDetails.runner.end();
        }
        clearElementAnimationState(node);
      }
    }