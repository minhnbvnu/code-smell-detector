function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn,
                                   jqCollection, originalReplaceDirective, preLinkFns, postLinkFns,
                                   previousCompileContext) {
      previousCompileContext = previousCompileContext || {};

      var terminalPriority = -Number.MAX_VALUE,
          newScopeDirective = previousCompileContext.newScopeDirective,
          controllerDirectives = previousCompileContext.controllerDirectives,
          newIsolateScopeDirective = previousCompileContext.newIsolateScopeDirective,
          templateDirective = previousCompileContext.templateDirective,
          nonTlbTranscludeDirective = previousCompileContext.nonTlbTranscludeDirective,
          hasTranscludeDirective = false,
          hasTemplate = false,
          hasElementTranscludeDirective = previousCompileContext.hasElementTranscludeDirective,
          $compileNode = templateAttrs.$$element = jqLite(compileNode),
          directive,
          directiveName,
          $template,
          replaceDirective = originalReplaceDirective,
          childTranscludeFn = transcludeFn,
          linkFn,
          didScanForMultipleTransclusion = false,
          mightHaveMultipleTransclusionError = false,
          directiveValue;

      // executes all directives on the current element
      for (var i = 0, ii = directives.length; i < ii; i++) {
        directive = directives[i];
        var attrStart = directive.$$start;
        var attrEnd = directive.$$end;

        // collect multiblock sections
        if (attrStart) {
          $compileNode = groupScan(compileNode, attrStart, attrEnd);
        }
        $template = undefined;

        if (terminalPriority > directive.priority) {
          break; // prevent further processing of directives
        }

        if (directiveValue = directive.scope) {

          // skip the check for directives with async templates, we'll check the derived sync
          // directive when the template arrives
          if (!directive.templateUrl) {
            if (isObject(directiveValue)) {
              // This directive is trying to add an isolated scope.
              // Check that there is no scope of any kind already
              assertNoDuplicate('new/isolated scope', newIsolateScopeDirective || newScopeDirective,
                                directive, $compileNode);
              newIsolateScopeDirective = directive;
            } else {
              // This directive is trying to add a child scope.
              // Check that there is no isolated scope already
              assertNoDuplicate('new/isolated scope', newIsolateScopeDirective, directive,
                                $compileNode);
            }
          }

          newScopeDirective = newScopeDirective || directive;
        }

        directiveName = directive.name;

        // If we encounter a condition that can result in transclusion on the directive,
        // then scan ahead in the remaining directives for others that may cause a multiple
        // transclusion error to be thrown during the compilation process.  If a matching directive
        // is found, then we know that when we encounter a transcluded directive, we need to eagerly
        // compile the `transclude` function rather than doing it lazily in order to throw
        // exceptions at the correct time
        if (!didScanForMultipleTransclusion && ((directive.replace && (directive.templateUrl || directive.template))
            || (directive.transclude && !directive.$$tlb))) {
                var candidateDirective;

                for (var scanningIndex = i + 1; candidateDirective = directives[scanningIndex++];) {
                    if ((candidateDirective.transclude && !candidateDirective.$$tlb)
                        || (candidateDirective.replace && (candidateDirective.templateUrl || candidateDirective.template))) {
                        mightHaveMultipleTransclusionError = true;
                        break;
                    }
                }

                didScanForMultipleTransclusion = true;
        }

        if (!directive.templateUrl && directive.controller) {
          directiveValue = directive.controller;
          controllerDirectives = controllerDirectives || createMap();
          assertNoDuplicate("'" + directiveName + "' controller",
              controllerDirectives[directiveName], directive, $compileNode);
          controllerDirectives[directiveName] = directive;
        }

        if (directiveValue = directive.transclude) {
          hasTranscludeDirective = true;

          // Special case ngIf and ngRepeat so that we don't complain about duplicate transclusion.
          // This option should only be used by directives that know how to safely handle element transclusion,
          // where the transcluded nodes are added or replaced after linking.
          if (!directive.$$tlb) {
            assertNoDuplicate('transclusion', nonTlbTranscludeDirective, directive, $compileNode);
            nonTlbTranscludeDirective = directive;
          }

          if (directiveValue == 'element') {
            hasElementTranscludeDirective = true;
            terminalPriority = directive.priority;
            $template = $compileNode;
            $compileNode = templateAttrs.$$element =
                jqLite(compile.$$createComment(directiveName, templateAttrs[directiveName]));
            compileNode = $compileNode[0];
            replaceWith(jqCollection, sliceArgs($template), compileNode);

            // Support: Chrome < 50
            // https://github.com/angular/angular.js/issues/14041

            // In the versions of V8 prior to Chrome 50, the document fragment that is created
            // in the `replaceWith` function is improperly garbage collected despite still
            // being referenced by the `parentNode` property of all of the child nodes.  By adding
            // a reference to the fragment via a different property, we can avoid that incorrect
            // behavior.
            // TODO: remove this line after Chrome 50 has been released
            $template[0].$$parentNode = $template[0].parentNode;

            childTranscludeFn = compilationGenerator(mightHaveMultipleTransclusionError, $template, transcludeFn, terminalPriority,
                                        replaceDirective && replaceDirective.name, {
                                          // Don't pass in:
                                          // - controllerDirectives - otherwise we'll create duplicates controllers
                                          // - newIsolateScopeDirective or templateDirective - combining templates with
                                          //   element transclusion doesn't make sense.
                                          //
                                          // We need only nonTlbTranscludeDirective so that we prevent putting transclusion
                                          // on the same element more than once.
                                          nonTlbTranscludeDirective: nonTlbTranscludeDirective
                                        });
          } else {

            var slots = createMap();

            $template = jqLite(jqLiteClone(compileNode)).contents();

            if (isObject(directiveValue)) {

              // We have transclusion slots,
              // collect them up, compile them and store their transclusion functions
              $template = [];

              var slotMap = createMap();
              var filledSlots = createMap();

              // Parse the element selectors
              forEach(directiveValue, function(elementSelector, slotName) {
                // If an element selector starts with a ? then it is optional
                var optional = (elementSelector.charAt(0) === '?');
                elementSelector = optional ? elementSelector.substring(1) : elementSelector;

                slotMap[elementSelector] = slotName;

                // We explicitly assign `null` since this implies that a slot was defined but not filled.
                // Later when calling boundTransclusion functions with a slot name we only error if the
                // slot is `undefined`
                slots[slotName] = null;

                // filledSlots contains `true` for all slots that are either optional or have been
                // filled. This is used to check that we have not missed any required slots
                filledSlots[slotName] = optional;
              });

              // Add the matching elements into their slot
              forEach($compileNode.contents(), function(node) {
                var slotName = slotMap[directiveNormalize(nodeName_(node))];
                if (slotName) {
                  filledSlots[slotName] = true;
                  slots[slotName] = slots[slotName] || [];
                  slots[slotName].push(node);
                } else {
                  $template.push(node);
                }
              });

              // Check for required slots that were not filled
              forEach(filledSlots, function(filled, slotName) {
                if (!filled) {
                  throw $compileMinErr('reqslot', 'Required transclusion slot `{0}` was not filled.', slotName);
                }
              });

              for (var slotName in slots) {
                if (slots[slotName]) {
                  // Only define a transclusion function if the slot was filled
                  slots[slotName] = compilationGenerator(mightHaveMultipleTransclusionError, slots[slotName], transcludeFn);
                }
              }
            }

            $compileNode.empty(); // clear contents
            childTranscludeFn = compilationGenerator(mightHaveMultipleTransclusionError, $template, transcludeFn, undefined,
                undefined, { needsNewScope: directive.$$isolateScope || directive.$$newScope});
            childTranscludeFn.$$slots = slots;
          }
        }

        if (directive.template) {
          hasTemplate = true;
          assertNoDuplicate('template', templateDirective, directive, $compileNode);
          templateDirective = directive;

          directiveValue = (isFunction(directive.template))
              ? directive.template($compileNode, templateAttrs)
              : directive.template;

          directiveValue = denormalizeTemplate(directiveValue);

          if (directive.replace) {
            replaceDirective = directive;
            if (jqLiteIsTextNode(directiveValue)) {
              $template = [];
            } else {
              $template = removeComments(wrapTemplate(directive.templateNamespace, trim(directiveValue)));
            }
            compileNode = $template[0];

            if ($template.length != 1 || compileNode.nodeType !== NODE_TYPE_ELEMENT) {
              throw $compileMinErr('tplrt',
                  "Template for directive '{0}' must have exactly one root element. {1}",
                  directiveName, '');
            }

            replaceWith(jqCollection, $compileNode, compileNode);

            var newTemplateAttrs = {$attr: {}};

            // combine directives from the original node and from the template:
            // - take the array of directives for this element
            // - split it into two parts, those that already applied (processed) and those that weren't (unprocessed)
            // - collect directives from the template and sort them by priority
            // - combine directives as: processed + template + unprocessed
            var templateDirectives = collectDirectives(compileNode, [], newTemplateAttrs);
            var unprocessedDirectives = directives.splice(i + 1, directives.length - (i + 1));

            if (newIsolateScopeDirective || newScopeDirective) {
              // The original directive caused the current element to be replaced but this element
              // also needs to have a new scope, so we need to tell the template directives
              // that they would need to get their scope from further up, if they require transclusion
              markDirectiveScope(templateDirectives, newIsolateScopeDirective, newScopeDirective);
            }
            directives = directives.concat(templateDirectives).concat(unprocessedDirectives);
            mergeTemplateAttributes(templateAttrs, newTemplateAttrs);

            ii = directives.length;
          } else {
            $compileNode.html(directiveValue);
          }
        }

        if (directive.templateUrl) {
          hasTemplate = true;
          assertNoDuplicate('template', templateDirective, directive, $compileNode);
          templateDirective = directive;

          if (directive.replace) {
            replaceDirective = directive;
          }

          nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), $compileNode,
              templateAttrs, jqCollection, hasTranscludeDirective && childTranscludeFn, preLinkFns, postLinkFns, {
                controllerDirectives: controllerDirectives,
                newScopeDirective: (newScopeDirective !== directive) && newScopeDirective,
                newIsolateScopeDirective: newIsolateScopeDirective,
                templateDirective: templateDirective,
                nonTlbTranscludeDirective: nonTlbTranscludeDirective
              });
          ii = directives.length;
        } else if (directive.compile) {
          try {
            linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
            if (isFunction(linkFn)) {
              addLinkFns(null, linkFn, attrStart, attrEnd);
            } else if (linkFn) {
              addLinkFns(linkFn.pre, linkFn.post, attrStart, attrEnd);
            }
          } catch (e) {
            $exceptionHandler(e, startingTag($compileNode));
          }
        }

        if (directive.terminal) {
          nodeLinkFn.terminal = true;
          terminalPriority = Math.max(terminalPriority, directive.priority);
        }

      }

      nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope === true;
      nodeLinkFn.transcludeOnThisElement = hasTranscludeDirective;
      nodeLinkFn.templateOnThisElement = hasTemplate;
      nodeLinkFn.transclude = childTranscludeFn;

      previousCompileContext.hasElementTranscludeDirective = hasElementTranscludeDirective;

      // might be normal or delayed nodeLinkFn depending on if templateUrl is present
      return nodeLinkFn;

      ////////////////////

      function addLinkFns(pre, post, attrStart, attrEnd) {
        if (pre) {
          if (attrStart) pre = groupElementsLinkFnWrapper(pre, attrStart, attrEnd);
          pre.require = directive.require;
          pre.directiveName = directiveName;
          if (newIsolateScopeDirective === directive || directive.$$isolateScope) {
            pre = cloneAndAnnotateFn(pre, {isolateScope: true});
          }
          preLinkFns.push(pre);
        }
        if (post) {
          if (attrStart) post = groupElementsLinkFnWrapper(post, attrStart, attrEnd);
          post.require = directive.require;
          post.directiveName = directiveName;
          if (newIsolateScopeDirective === directive || directive.$$isolateScope) {
            post = cloneAndAnnotateFn(post, {isolateScope: true});
          }
          postLinkFns.push(post);
        }
      }

      function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
        var i, ii, linkFn, isolateScope, controllerScope, elementControllers, transcludeFn, $element,
            attrs, removeScopeBindingWatches, removeControllerBindingWatches;

        if (compileNode === linkNode) {
          attrs = templateAttrs;
          $element = templateAttrs.$$element;
        } else {
          $element = jqLite(linkNode);
          attrs = new Attributes($element, templateAttrs);
        }

        controllerScope = scope;
        if (newIsolateScopeDirective) {
          isolateScope = scope.$new(true);
        } else if (newScopeDirective) {
          controllerScope = scope.$parent;
        }

        if (boundTranscludeFn) {
          // track `boundTranscludeFn` so it can be unwrapped if `transcludeFn`
          // is later passed as `parentBoundTranscludeFn` to `publicLinkFn`
          transcludeFn = controllersBoundTransclude;
          transcludeFn.$$boundTransclude = boundTranscludeFn;
          // expose the slots on the `$transclude` function
          transcludeFn.isSlotFilled = function(slotName) {
            return !!boundTranscludeFn.$$slots[slotName];
          };
        }

        if (controllerDirectives) {
          elementControllers = setupControllers($element, attrs, transcludeFn, controllerDirectives, isolateScope, scope, newIsolateScopeDirective);
        }

        if (newIsolateScopeDirective) {
          // Initialize isolate scope bindings for new isolate scope directive.
          compile.$$addScopeInfo($element, isolateScope, true, !(templateDirective && (templateDirective === newIsolateScopeDirective ||
              templateDirective === newIsolateScopeDirective.$$originalDirective)));
          compile.$$addScopeClass($element, true);
          isolateScope.$$isolateBindings =
              newIsolateScopeDirective.$$isolateBindings;
          removeScopeBindingWatches = initializeDirectiveBindings(scope, attrs, isolateScope,
                                        isolateScope.$$isolateBindings,
                                        newIsolateScopeDirective);
          if (removeScopeBindingWatches) {
            isolateScope.$on('$destroy', removeScopeBindingWatches);
          }
        }

        // Initialize bindToController bindings
        for (var name in elementControllers) {
          var controllerDirective = controllerDirectives[name];
          var controller = elementControllers[name];
          var bindings = controllerDirective.$$bindings.bindToController;

          if (controller.identifier && bindings) {
            removeControllerBindingWatches =
              initializeDirectiveBindings(controllerScope, attrs, controller.instance, bindings, controllerDirective);
          }

          var controllerResult = controller();
          if (controllerResult !== controller.instance) {
            // If the controller constructor has a return value, overwrite the instance
            // from setupControllers
            controller.instance = controllerResult;
            $element.data('$' + controllerDirective.name + 'Controller', controllerResult);
            removeControllerBindingWatches && removeControllerBindingWatches();
            removeControllerBindingWatches =
              initializeDirectiveBindings(controllerScope, attrs, controller.instance, bindings, controllerDirective);
          }
        }

        // Bind the required controllers to the controller, if `require` is an object and `bindToController` is truthy
        forEach(controllerDirectives, function(controllerDirective, name) {
          var require = controllerDirective.require;
          if (controllerDirective.bindToController && !isArray(require) && isObject(require)) {
            extend(elementControllers[name].instance, getControllers(name, require, $element, elementControllers));
          }
        });

        // Handle the init and destroy lifecycle hooks on all controllers that have them
        forEach(elementControllers, function(controller) {
          var controllerInstance = controller.instance;
          if (isFunction(controllerInstance.$onInit)) {
            controllerInstance.$onInit();
          }
          if (isFunction(controllerInstance.$onDestroy)) {
            controllerScope.$on('$destroy', function callOnDestroyHook() {
              controllerInstance.$onDestroy();
            });
          }
        });

        // PRELINKING
        for (i = 0, ii = preLinkFns.length; i < ii; i++) {
          linkFn = preLinkFns[i];
          invokeLinkFn(linkFn,
              linkFn.isolateScope ? isolateScope : scope,
              $element,
              attrs,
              linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers),
              transcludeFn
          );
        }

        // RECURSION
        // We only pass the isolate scope, if the isolate directive has a template,
        // otherwise the child elements do not belong to the isolate directive.
        var scopeToChild = scope;
        if (newIsolateScopeDirective && (newIsolateScopeDirective.template || newIsolateScopeDirective.templateUrl === null)) {
          scopeToChild = isolateScope;
        }
        childLinkFn && childLinkFn(scopeToChild, linkNode.childNodes, undefined, boundTranscludeFn);

        // POSTLINKING
        for (i = postLinkFns.length - 1; i >= 0; i--) {
          linkFn = postLinkFns[i];
          invokeLinkFn(linkFn,
              linkFn.isolateScope ? isolateScope : scope,
              $element,
              attrs,
              linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers),
              transcludeFn
          );
        }

        // Trigger $postLink lifecycle hooks
        forEach(elementControllers, function(controller) {
          var controllerInstance = controller.instance;
          if (isFunction(controllerInstance.$postLink)) {
            controllerInstance.$postLink();
          }
        });

        // This is the function that is injected as `$transclude`.
        // Note: all arguments are optional!
        function controllersBoundTransclude(scope, cloneAttachFn, futureParentElement, slotName) {
          var transcludeControllers;
          // No scope passed in:
          if (!isScope(scope)) {
            slotName = futureParentElement;
            futureParentElement = cloneAttachFn;
            cloneAttachFn = scope;
            scope = undefined;
          }

          if (hasElementTranscludeDirective) {
            transcludeControllers = elementControllers;
          }
          if (!futureParentElement) {
            futureParentElement = hasElementTranscludeDirective ? $element.parent() : $element;
          }
          if (slotName) {
            // slotTranscludeFn can be one of three things:
            //  * a transclude function - a filled slot
            //  * `null` - an optional slot that was not filled
            //  * `undefined` - a slot that was not declared (i.e. invalid)
            var slotTranscludeFn = boundTranscludeFn.$$slots[slotName];
            if (slotTranscludeFn) {
              return slotTranscludeFn(scope, cloneAttachFn, transcludeControllers, futureParentElement, scopeToChild);
            } else if (isUndefined(slotTranscludeFn)) {
              throw $compileMinErr('noslot',
               'No parent directive that requires a transclusion with slot name "{0}". ' +
               'Element: {1}',
               slotName, startingTag($element));
            }
          } else {
            return boundTranscludeFn(scope, cloneAttachFn, transcludeControllers, futureParentElement, scopeToChild);
          }
        }
      }
    }