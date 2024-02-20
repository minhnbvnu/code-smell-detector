function isCalledInSomePath(segment) {
                return segment.reachable && segInfoMap[segment.id].calledInSomePaths;
            }