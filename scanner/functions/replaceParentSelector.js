function replaceParentSelector(paths, context, inSelector) {
                // The paths are [[Selector]]
                // The first list is a list of comma separated selectors
                // The inner list is a list of inheritance separated selectors
                // e.g.
                // .a, .b {
                //   .c {
                //   }
                // }
                // == [[.a] [.c]] [[.b] [.c]]
                //
                var i, j, k, currentElements, newSelectors, selectorsMultiplied, sel, el, hadParentSelector = false, length, lastSelector;
                function findNestedSelector(element) {
                    var maybeSelector;
                    if (!(element.value instanceof paren_1.default)) {
                        return null;
                    }
                    maybeSelector = element.value.value;
                    if (!(maybeSelector instanceof selector_1.default)) {
                        return null;
                    }
                    return maybeSelector;
                }
                // the elements from the current selector so far
                currentElements = [];
                // the current list of new selectors to add to the path.
                // We will build it up. We initiate it with one empty selector as we "multiply" the new selectors
                // by the parents
                newSelectors = [
                    []
                ];
                for (i = 0; (el = inSelector.elements[i]); i++) {
                    // non parent reference elements just get added
                    if (el.value !== '&') {
                        var nestedSelector = findNestedSelector(el);
                        if (nestedSelector != null) {
                            // merge the current list of non parent selector elements
                            // on to the current list of selectors to add
                            mergeElementsOnToSelectors(currentElements, newSelectors);
                            var nestedPaths = [];
                            var replaced = void 0;
                            var replacedNewSelectors = [];
                            replaced = replaceParentSelector(nestedPaths, context, nestedSelector);
                            hadParentSelector = hadParentSelector || replaced;
                            // the nestedPaths array should have only one member - replaceParentSelector does not multiply selectors
                            for (k = 0; k < nestedPaths.length; k++) {
                                var replacementSelector = createSelector(createParenthesis(nestedPaths[k], el), el);
                                addAllReplacementsIntoPath(newSelectors, [replacementSelector], el, inSelector, replacedNewSelectors);
                            }
                            newSelectors = replacedNewSelectors;
                            currentElements = [];
                        }
                        else {
                            currentElements.push(el);
                        }
                    }
                    else {
                        hadParentSelector = true;
                        // the new list of selectors to add
                        selectorsMultiplied = [];
                        // merge the current list of non parent selector elements
                        // on to the current list of selectors to add
                        mergeElementsOnToSelectors(currentElements, newSelectors);
                        // loop through our current selectors
                        for (j = 0; j < newSelectors.length; j++) {
                            sel = newSelectors[j];
                            // if we don't have any parent paths, the & might be in a mixin so that it can be used
                            // whether there are parents or not
                            if (context.length === 0) {
                                // the combinator used on el should now be applied to the next element instead so that
                                // it is not lost
                                if (sel.length > 0) {
                                    sel[0].elements.push(new element_1.default(el.combinator, '', el.isVariable, el._index, el._fileInfo));
                                }
                                selectorsMultiplied.push(sel);
                            }
                            else {
                                // and the parent selectors
                                for (k = 0; k < context.length; k++) {
                                    // We need to put the current selectors
                                    // then join the last selector's elements on to the parents selectors
                                    var newSelectorPath = addReplacementIntoPath(sel, context[k], el, inSelector);
                                    // add that to our new set of selectors
                                    selectorsMultiplied.push(newSelectorPath);
                                }
                            }
                        }
                        // our new selectors has been multiplied, so reset the state
                        newSelectors = selectorsMultiplied;
                        currentElements = [];
                    }
                }
                // if we have any elements left over (e.g. .a& .b == .b)
                // add them on to all the current selectors
                mergeElementsOnToSelectors(currentElements, newSelectors);
                for (i = 0; i < newSelectors.length; i++) {
                    length = newSelectors[i].length;
                    if (length > 0) {
                        paths.push(newSelectors[i]);
                        lastSelector = newSelectors[i][length - 1];
                        newSelectors[i][length - 1] = lastSelector.createDerived(lastSelector.elements, inSelector.extendList);
                    }
                }
                return hadParentSelector;
            }