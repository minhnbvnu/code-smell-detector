function addReplacementIntoPath(beginningPath, addPath, replacedElement, originalSelector) {
                var newSelectorPath, lastSelector, newJoinedSelector;
                // our new selector path
                newSelectorPath = [];
                // construct the joined selector - if & is the first thing this will be empty,
                // if not newJoinedSelector will be the last set of elements in the selector
                if (beginningPath.length > 0) {
                    newSelectorPath = utils.copyArray(beginningPath);
                    lastSelector = newSelectorPath.pop();
                    newJoinedSelector = originalSelector.createDerived(utils.copyArray(lastSelector.elements));
                }
                else {
                    newJoinedSelector = originalSelector.createDerived([]);
                }
                if (addPath.length > 0) {
                    // /deep/ is a CSS4 selector - (removed, so should deprecate)
                    // that is valid without anything in front of it
                    // so if the & does not have a combinator that is "" or " " then
                    // and there is a combinator on the parent, then grab that.
                    // this also allows + a { & .b { .a & { ... though not sure why you would want to do that
                    var combinator = replacedElement.combinator;
                    var parentEl = addPath[0].elements[0];
                    if (combinator.emptyOrWhitespace && !parentEl.combinator.emptyOrWhitespace) {
                        combinator = parentEl.combinator;
                    }
                    // join the elements so far with the first part of the parent
                    newJoinedSelector.elements.push(new element_1.default(combinator, parentEl.value, replacedElement.isVariable, replacedElement._index, replacedElement._fileInfo));
                    newJoinedSelector.elements = newJoinedSelector.elements.concat(addPath[0].elements.slice(1));
                }
                // now add the joined selector - but only if it is not empty
                if (newJoinedSelector.elements.length !== 0) {
                    newSelectorPath.push(newJoinedSelector);
                }
                // put together the parent selectors after the join (e.g. the rest of the parent)
                if (addPath.length > 1) {
                    var restOfPath = addPath.slice(1);
                    restOfPath = restOfPath.map(function (selector) {
                        return selector.createDerived(selector.elements, []);
                    });
                    newSelectorPath = newSelectorPath.concat(restOfPath);
                }
                return newSelectorPath;
            }