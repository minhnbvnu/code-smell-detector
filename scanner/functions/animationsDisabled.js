function animationsDisabled(element, parentElement) {
        if (rootAnimateState.disabled) {
          return true;
        }

        if (isMatchingElement(element, $rootElement)) {
          return rootAnimateState.running;
        }

        var allowChildAnimations, parentRunningAnimation, hasParent;
        do {
          //the element did not reach the root element which means that it
          //is not apart of the DOM. Therefore there is no reason to do
          //any animations on it
          if (parentElement.length === 0) break;

          var isRoot = isMatchingElement(parentElement, $rootElement);
          var state = isRoot ? rootAnimateState : (parentElement.data(NG_ANIMATE_STATE) || {});
          if (state.disabled) {
            return true;
          }

          //no matter what, for an animation to work it must reach the root element
          //this implies that the element is attached to the DOM when the animation is run
          if (isRoot) {
            hasParent = true;
          }

          //once a flag is found that is strictly false then everything before
          //it will be discarded and all child animations will be restricted
          if (allowChildAnimations !== false) {
            var animateChildrenFlag = parentElement.data(NG_ANIMATE_CHILDREN);
            if (angular.isDefined(animateChildrenFlag)) {
              allowChildAnimations = animateChildrenFlag;
            }
          }

          parentRunningAnimation = parentRunningAnimation ||
                                   state.running ||
                                   (state.last && !state.last.isClassBased);
        }
        while (parentElement = parentElement.parent());

        return !hasParent || (!allowChildAnimations && parentRunningAnimation);
      }