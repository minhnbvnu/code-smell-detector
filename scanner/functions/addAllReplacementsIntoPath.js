function addAllReplacementsIntoPath(beginningPath, addPaths, replacedElement, originalSelector, result) {
                var j;
                for (j = 0; j < beginningPath.length; j++) {
                    var newSelectorPath = addReplacementIntoPath(beginningPath[j], addPaths, replacedElement, originalSelector);
                    result.push(newSelectorPath);
                }
                return result;
            }