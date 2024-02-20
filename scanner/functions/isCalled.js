function isCalled(segment) {
                return !segment.reachable || segInfoMap[segment.id].superCalled;
            }