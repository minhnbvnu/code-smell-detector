function forEachEnclosingClass(node, callback) {
                let result;
                let containingClass = getContainingClass(node);
                while (containingClass) {
                    if (result = callback(containingClass))
                        break;
                    containingClass = getContainingClass(containingClass);
                }
                return result;
            }