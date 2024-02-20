function animationRunner(element, animationEvent, className, options) {
        //transcluded directives may sometimes fire an animation using only comment nodes
        //best to catch this early on to prevent any animation operations from occurring
        var node = element[0];
        if (!node) {
          return;
        }

        if (options) {
          options.to = options.to || {};
          options.from = options.from || {};
        }

        var classNameAdd;
        var classNameRemove;
        if (isArray(className)) {
          classNameAdd = className[0];
          classNameRemove = className[1];
          if (!classNameAdd) {
            className = classNameRemove;
            animationEvent = 'removeClass';
          } else if (!classNameRemove) {
            className = classNameAdd;
            animationEvent = 'addClass';
          } else {
            className = classNameAdd + ' ' + classNameRemove;
          }
        }

        var isSetClassOperation = animationEvent == 'setClass';
        var isClassBased = isSetClassOperation
                           || animationEvent == 'addClass'
                           || animationEvent == 'removeClass'
                           || animationEvent == 'animate';

        var currentClassName = element.attr('class');
        var classes = currentClassName + ' ' + className;
        if (!isAnimatableClassName(classes)) {
          return;
        }

        var beforeComplete = noop,
            beforeCancel = [],
            before = [],
            afterComplete = noop,
            afterCancel = [],
            after = [];

        var animationLookup = (' ' + classes).replace(/\s+/g,'.');
        forEach(lookup(animationLookup), function(animationFactory) {
          var created = registerAnimation(animationFactory, animationEvent);
          if (!created && isSetClassOperation) {
            registerAnimation(animationFactory, 'addClass');
            registerAnimation(animationFactory, 'removeClass');
          }
        });

        function registerAnimation(animationFactory, event) {
          var afterFn = animationFactory[event];
          var beforeFn = animationFactory['before' + event.charAt(0).toUpperCase() + event.substr(1)];
          if (afterFn || beforeFn) {
            if (event == 'leave') {
              beforeFn = afterFn;
              //when set as null then animation knows to skip this phase
              afterFn = null;
            }
            after.push({
              event: event, fn: afterFn
            });
            before.push({
              event: event, fn: beforeFn
            });
            return true;
          }
        }

        function run(fns, cancellations, allCompleteFn) {
          var animations = [];
          forEach(fns, function(animation) {
            animation.fn && animations.push(animation);
          });

          var count = 0;
          function afterAnimationComplete(index) {
            if (cancellations) {
              (cancellations[index] || noop)();
              if (++count < animations.length) return;
              cancellations = null;
            }
            allCompleteFn();
          }

          //The code below adds directly to the array in order to work with
          //both sync and async animations. Sync animations are when the done()
          //operation is called right away. DO NOT REFACTOR!
          forEach(animations, function(animation, index) {
            var progress = function() {
              afterAnimationComplete(index);
            };
            switch (animation.event) {
              case 'setClass':
                cancellations.push(animation.fn(element, classNameAdd, classNameRemove, progress, options));
                break;
              case 'animate':
                cancellations.push(animation.fn(element, className, options.from, options.to, progress));
                break;
              case 'addClass':
                cancellations.push(animation.fn(element, classNameAdd || className,     progress, options));
                break;
              case 'removeClass':
                cancellations.push(animation.fn(element, classNameRemove || className,  progress, options));
                break;
              default:
                cancellations.push(animation.fn(element, progress, options));
                break;
            }
          });

          if (cancellations && cancellations.length === 0) {
            allCompleteFn();
          }
        }

        return {
          node: node,
          event: animationEvent,
          className: className,
          isClassBased: isClassBased,
          isSetClassOperation: isSetClassOperation,
          applyStyles: function() {
            if (options) {
              element.css(angular.extend(options.from || {}, options.to || {}));
            }
          },
          before: function(allCompleteFn) {
            beforeComplete = allCompleteFn;
            run(before, beforeCancel, function() {
              beforeComplete = noop;
              allCompleteFn();
            });
          },
          after: function(allCompleteFn) {
            afterComplete = allCompleteFn;
            run(after, afterCancel, function() {
              afterComplete = noop;
              allCompleteFn();
            });
          },
          cancel: function() {
            if (beforeCancel) {
              forEach(beforeCancel, function(cancelFn) {
                (cancelFn || noop)(true);
              });
              beforeComplete(true);
            }
            if (afterCancel) {
              forEach(afterCancel, function(cancelFn) {
                (cancelFn || noop)(true);
              });
              afterComplete(true);
            }
          }
        };
      }