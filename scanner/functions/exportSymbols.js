function exportSymbols(window) {
      function _export(){
        window.registerAnimator = registerAnimator;

        window.WorkletAnimationKeyframeEffect = KeyframeEffect;
        window.WorkletAnimation = WorkletAnimation;
        window.ScrollTimeline = ScrollTimeline;
        window.DocumentTimeline = DocumentTimeline;
        // Replace default keyframe effect with animation worklet version, and
        // document timeline with our version.
        window.KeyframeEffect = window.WorkletAnimationKeyframeEffect;
        redefineGetter(window.document, 'timeline', new DocumentTimeline())

        redefineGetter(window.CSS, 'animationWorklet', new AnimationWorklet())
      }

      // Ensure the WebAnimations polyfill is loaded.
      if (!window.webAnimations1) {
        return loadScriptSync('https://rawgit.com/web-animations/web-animations-js/master/web-animations-next.dev.js').then(_export);
      } else {
        return Promise.resolve(_export());
      }
    }