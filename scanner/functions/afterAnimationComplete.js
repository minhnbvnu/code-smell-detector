function afterAnimationComplete(index) {
            if (cancellations) {
              (cancellations[index] || noop)();
              if (++count < animations.length) return;
              cancellations = null;
            }
            allCompleteFn();
          }